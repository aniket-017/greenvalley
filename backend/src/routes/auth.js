const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { adminUsername, adminPassword, jwtSecret, jwtExpiresIn } = require('../config');

const router = express.Router();

let passwordHash = null;

function getPasswordHash() {
  if (!passwordHash) {
    passwordHash = bcrypt.hashSync(adminPassword, 10);
  }
  return passwordHash;
}

router.post('/login', (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  if (username !== adminUsername || !bcrypt.compareSync(password, getPasswordHash())) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ role: 'admin', username }, jwtSecret, { expiresIn: jwtExpiresIn });
  return res.json({ token, username });
});

module.exports = router;
