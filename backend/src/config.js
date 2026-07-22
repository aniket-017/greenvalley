require('dotenv').config();
const path = require('path');

module.exports = {
  port: process.env.PORT || 3691,
  jwtSecret: process.env.JWT_SECRET || 'dev-change-me-in-production',
  adminUsername: process.env.ADMIN_USERNAME || 'admin',
  adminPassword: process.env.ADMIN_PASSWORD || 'admin123',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '8h',
  mongoUri: process.env.MONGODB_URI || '',
  uploadsDir: path.join(__dirname, '../uploads'),
  teachersUploadDir: path.join(__dirname, '../uploads/teachers'),
};
