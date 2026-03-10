const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const { port } = require('./config');
const apiRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

// Serve React build in production (when frontend/dist exists)
const frontendDist = path.join(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(frontendDist, 'index.html'), (err) => {
      if (err) next();
    });
  });
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
