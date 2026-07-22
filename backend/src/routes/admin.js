const multer = require('multer');
const express = require('express');
const { requireAuth } = require('../middleware/auth');
const { Section, Teacher } = require('../models/faculty');
const { getFacultyTree, mapTeacher, mapSection } = require('../services/facultyService');
const { compressAndSaveTeacherPhoto, deletePhotoFile } = require('../utils/photos');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 8 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      cb(new Error('Only image uploads are allowed'));
      return;
    }
    cb(null, true);
  },
});

router.use(requireAuth);

router.get('/faculty', async (req, res) => {
  try {
    const sections = await getFacultyTree();
    res.json({ sections });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load faculty' });
  }
});

router.get('/sections', async (req, res) => {
  try {
    const sections = await Section.find().sort({ sortOrder: 1, title: 1 });
    res.json({ sections: sections.map((section) => mapSection(section)) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load sections' });
  }
});

router.post('/sections', async (req, res) => {
  try {
    const title = (req.body?.title || '').trim();
    if (!title) {
      return res.status(400).json({ error: 'Section title is required' });
    }

    const last = await Section.findOne().sort({ sortOrder: -1 }).select('sortOrder');
    const sortOrder = last ? last.sortOrder + 1 : 0;
    const section = await Section.create({ title, sortOrder });
    return res.status(201).json(mapSection(section));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create section' });
  }
});

router.put('/sections/reorder', async (req, res) => {
  try {
    const orderedIds = Array.isArray(req.body?.orderedIds) ? req.body.orderedIds.map(String) : [];
    if (!orderedIds.length) {
      return res.status(400).json({ error: 'orderedIds array is required' });
    }

    const sections = await Section.find({ _id: { $in: orderedIds } });
    if (sections.length !== orderedIds.length) {
      return res.status(400).json({ error: 'One or more section ids are invalid' });
    }

    await Promise.all(
      orderedIds.map((id, index) => Section.updateOne({ _id: id }, { $set: { sortOrder: index } })),
    );

    const updated = await getFacultyTree();
    return res.json({ sections: updated });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to reorder sections' });
  }
});

router.put('/sections/:id', async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    const title = (req.body?.title || '').trim();
    if (!title) {
      return res.status(400).json({ error: 'Section title is required' });
    }

    section.title = title;
    if (req.body?.sortOrder != null && Number.isFinite(Number(req.body.sortOrder))) {
      section.sortOrder = Number(req.body.sortOrder);
    }
    await section.save();
    return res.json(mapSection(section));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update section' });
  }
});

router.delete('/sections/:id', async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    const teachers = await Teacher.find({ sectionId: section._id });
    teachers.forEach((teacher) => deletePhotoFile(teacher.photo));
    await Teacher.deleteMany({ sectionId: section._id });
    await section.deleteOne();
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to delete section' });
  }
});

router.get('/teachers', async (req, res) => {
  try {
    const filter = {};
    if (req.query.sectionId) {
      filter.sectionId = req.query.sectionId;
    }
    const teachers = await Teacher.find(filter).sort({ sortOrder: 1, name: 1 });
    res.json({ teachers: teachers.map(mapTeacher) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load teachers' });
  }
});

router.post('/teachers', async (req, res) => {
  try {
    const sectionId = (req.body?.sectionId || '').trim();
    const name = (req.body?.name || '').trim();
    const subject = (req.body?.subject || '').trim();

    if (!sectionId || !name || !subject) {
      return res.status(400).json({ error: 'sectionId, name, and subject are required' });
    }

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }

    const last = await Teacher.findOne({ sectionId }).sort({ sortOrder: -1 }).select('sortOrder');
    const sortOrder = last ? last.sortOrder + 1 : 0;
    const teacher = await Teacher.create({
      sectionId,
      name,
      subject,
      photo: null,
      sortOrder,
    });

    return res.status(201).json(mapTeacher(teacher));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create teacher' });
  }
});

router.put('/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    const name = (req.body?.name ?? teacher.name).trim();
    const subject = (req.body?.subject ?? teacher.subject).trim();
    if (!name || !subject) {
      return res.status(400).json({ error: 'Name and subject are required' });
    }

    if (req.body?.sectionId) {
      const nextSectionId = String(req.body.sectionId).trim();
      const section = await Section.findById(nextSectionId);
      if (!section) {
        return res.status(404).json({ error: 'Section not found' });
      }
      teacher.sectionId = nextSectionId;
    }

    teacher.name = name;
    teacher.subject = subject;
    if (req.body?.sortOrder != null && Number.isFinite(Number(req.body.sortOrder))) {
      teacher.sortOrder = Number(req.body.sortOrder);
    }
    await teacher.save();
    return res.json(mapTeacher(teacher));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to update teacher' });
  }
});

router.post('/teachers/:id/photo', (req, res) => {
  upload.single('photo')(req, res, async (uploadErr) => {
    if (uploadErr) {
      return res.status(400).json({ error: uploadErr.message || 'Upload failed' });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ error: 'Photo file is required' });
      }

      const teacher = await Teacher.findById(req.params.id);
      if (!teacher) {
        return res.status(404).json({ error: 'Teacher not found' });
      }

      const saved = await compressAndSaveTeacherPhoto(req.file.buffer);
      if (teacher.photo) {
        deletePhotoFile(teacher.photo);
      }
      teacher.photo = saved.photoUrl;
      await teacher.save();

      return res.json(mapTeacher(teacher));
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to upload photo' });
    }
  });
});

router.delete('/teachers/:id/photo', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }

    if (teacher.photo) {
      deletePhotoFile(teacher.photo);
      teacher.photo = null;
      await teacher.save();
    }

    return res.json(mapTeacher(teacher));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to remove photo' });
  }
});

router.delete('/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    deletePhotoFile(teacher.photo);
    await teacher.deleteOne();
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to delete teacher' });
  }
});

module.exports = router;
