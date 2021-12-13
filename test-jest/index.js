const serverless = require('serverless-http');
const express = require('express');
const app = express();

// Improve the testability of routes
// by separating the route handler functions
// from the configuration of Express.

// route handler for '/'
_root = (req, res) => {
  res.send('Hello world!');
};
module.exports._root = _root;

// route handler for '/hello/:name'
_hello = (req, res) => {
  const { name = 'world' } = req.params;
  res.send(`Hello ${name}!`);
};
module.exports._hello = _hello;

// configure Express routes
app.get('/', _root);
app.get('/hello/:name', _hello);

// wrap Express with serverless-http plugin
module.exports.handler = serverless(app);