const express = require('express');
const app = express();
const fs = require('fs');

let html = fs.readFileSync(__dirname + '/index.html');
app.get('/', (req, res) => res.set('Content-Type', 'text/html').end(html));

module.exports = {};

/**
 * Allows data points to be added
 */
module.exports.addDataPoint = (name, obj) => {
  app.get(`/${name}`, (req, res) => {
    res.set('Content-Type', 'application/json').end(JSON.stringify(obj, null, 2));
  });
};

module.exports.listen = (port, cb) => {
  app.listen(port, cb);
};
