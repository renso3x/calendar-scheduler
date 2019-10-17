const express = require('express');
const cors = require('cors');
const routes = require('./config/routes');

const app = express();

app.use(cors());

routes(app);

const server = app.listen(4000, () => {
  console.log(`Connecting to port ${4000}`);
});

module.exports = server;
