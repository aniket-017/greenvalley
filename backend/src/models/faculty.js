const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

const teacherSchema = new mongoose.Schema(
  {
    sectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true, index: true },
    name: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    photo: { type: String, default: null },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: true } },
);

const Section = mongoose.models.Section || mongoose.model('Section', sectionSchema);
const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', teacherSchema);

module.exports = { Section, Teacher };
