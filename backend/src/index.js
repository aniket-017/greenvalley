const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { port, uploadsDir } = require('./config');
const { initDb, ensureUploadDirs } = require('./db');
const apiRoutes = require('./routes');

async function start() {
  await initDb();
  ensureUploadDirs();

  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/uploads', express.static(uploadsDir));
  app.use('/api', apiRoutes);

  // Serve React build in production (when frontend/dist exists)
  const frontendDist = path.join(__dirname, '../../frontend/dist');
  if (fs.existsSync(frontendDist)) {
    app.use(express.static(frontendDist));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) return next();
      res.sendFile(path.join(frontendDist, 'index.html'), (err) => {
        if (err) next();
      });
    });
  }

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
