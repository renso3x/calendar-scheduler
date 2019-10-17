const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require('./server/config/routes');

const app = express();

app.use(cors());

routes(app);

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
  console.log(`Connecting to port ${PORT}`);
});

module.exports = server;
