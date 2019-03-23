const express = require('express');
const app = express();

app.get('/', (req, res) => res.end('Hello world'));

module.exports = {};

/**
 * Allows data points to be added
 */
module.exports.addDataPoint = (name, obj) => {
  app.get(`/${name}`, (req, res) => {
    res.set('Content-Type', 'application/json').end(JSON.stringify(obj));
  });
};

module.exports.listen = (port, cb) => {
  app.listen(port, cb);
};
