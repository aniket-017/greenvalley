const express = require('express');
const { getFacultyTree } = require('../services/facultyService');

const router = express.Router();

router.get('/faculty', async (req, res) => {
  try {
    const sections = await getFacultyTree();
    res.json({ sections });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load faculty' });
  }
});

module.exports = router;
