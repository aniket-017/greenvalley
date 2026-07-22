const { Section, Teacher } = require('../models/faculty');

function mapTeacher(teacher) {
  return {
    id: String(teacher._id),
    sectionId: String(teacher.sectionId),
    name: teacher.name,
    subject: teacher.subject,
    photo: teacher.photo || null,
    sortOrder: teacher.sortOrder,
    createdAt: teacher.createdAt,
  };
}

function mapSection(section, teachers = []) {
  return {
    id: String(section._id),
    title: section.title,
    sortOrder: section.sortOrder,
    createdAt: section.createdAt,
    teachers: teachers.map(mapTeacher),
  };
}

async function getFacultyTree() {
  const sections = await Section.find().sort({ sortOrder: 1, title: 1 }).lean();
  const teachers = await Teacher.find().sort({ sortOrder: 1, name: 1 }).lean();

  const bySection = new Map();
  teachers.forEach((teacher) => {
    const key = String(teacher.sectionId);
    if (!bySection.has(key)) bySection.set(key, []);
    bySection.get(key).push(teacher);
  });

  return sections.map((section) => mapSection(section, bySection.get(String(section._id)) || []));
}

module.exports = {
  getFacultyTree,
  mapTeacher,
  mapSection,
};
