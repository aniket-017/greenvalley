const express = require('express');
const contactRouter = require('./contact');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/contact', contactRouter);

module.exports = router;
