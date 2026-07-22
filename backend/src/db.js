const fs = require('fs');
const mongoose = require('mongoose');
const { mongoUri, teachersUploadDir, uploadsDir } = require('./config');
const { Section, Teacher } = require('./models/faculty');
const seedFaculty = require('./data/seedFaculty');

function ensureUploadDirs() {
  [uploadsDir, teachersUploadDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
}

async function seedIfEmpty() {
  const count = await Section.countDocuments();
  if (count > 0) return;

  for (let sectionIndex = 0; sectionIndex < seedFaculty.length; sectionIndex += 1) {
    const sectionData = seedFaculty[sectionIndex];
    const section = await Section.create({
      title: sectionData.title,
      sortOrder: sectionIndex,
    });

    if (!sectionData.teachers?.length) continue;

    await Teacher.insertMany(
      sectionData.teachers.map((teacher, teacherIndex) => ({
        sectionId: section._id,
        name: teacher.name,
        subject: teacher.subject,
        photo: null,
        sortOrder: teacherIndex,
      })),
    );
  }

  console.log('Seeded classes faculty into MongoDB');
}

async function initDb() {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is missing. Add it to backend/.env');
  }

  ensureUploadDirs();
  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');
  await seedIfEmpty();
}

module.exports = { initDb, ensureUploadDirs };
