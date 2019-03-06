const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/hello', function(req,res) {
  res.send('Hello World!');
});

app.get('/goodbye', function(req,res) {
  res.send('Goodbye World!');
});

module.exports.handler = serverless(app);