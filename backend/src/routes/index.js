const express = require('express');
const contactRouter = require('./contact');
const authRouter = require('./auth');
const classesRouter = require('./classes');
const adminRouter = require('./admin');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/contact', contactRouter);
router.use('/auth', authRouter);
router.use('/classes', classesRouter);
router.use('/admin', adminRouter);

module.exports = router;
