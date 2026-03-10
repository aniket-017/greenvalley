const express = require('express');
const router = express.Router();

// Placeholder for future contact form (e.g. nodemailer, DB)
router.post('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Contact form coming soon. Your message will be processed.',
  });
});

module.exports = router;
