const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { randomUUID } = require('crypto');
const { teachersUploadDir } = require('../config');

function ensureTeachersDir() {
  if (!fs.existsSync(teachersUploadDir)) {
    fs.mkdirSync(teachersUploadDir, { recursive: true });
  }
}

function absoluteFromPhotoUrl(photoUrl) {
  if (!photoUrl) return null;
  const filename = path.basename(photoUrl);
  return path.join(teachersUploadDir, filename);
}

function deletePhotoFile(photoUrl) {
  const filePath = absoluteFromPhotoUrl(photoUrl);
  if (!filePath) return;
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

/**
 * Compress teacher photos aggressively for web cards:
 * - max edge 480px
 * - WebP quality 55
 * - strip metadata
 */
async function compressAndSaveTeacherPhoto(buffer) {
  ensureTeachersDir();
  const filename = `${randomUUID()}.webp`;
  const outputPath = path.join(teachersUploadDir, filename);

  await sharp(buffer)
    .rotate()
    .resize({
      width: 480,
      height: 640,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({
      quality: 55,
      effort: 6,
      smartSubsample: true,
    })
    .toFile(outputPath);

  return {
    filename,
    photoUrl: `/uploads/teachers/${filename}`,
    absolutePath: outputPath,
  };
}

module.exports = {
  compressAndSaveTeacherPhoto,
  deletePhotoFile,
  ensureTeachersDir,
};
