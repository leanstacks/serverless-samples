const serverless = require('serverless-http');
const express = require('express');
const app = express();

// GET get all users endpoint
app.get('/users', function (req, res) {
  const users = [{
    userId: 'jwick',
    name: 'John Wick'
  }, {
    userId: 'pblart',
    name: 'Paul Blart'
  }];

  res.json(users);
});

module.exports.handler = serverless(app);