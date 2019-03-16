const serverless = require('serverless-http');
const express = require('express');
const app = express();

// Environment variables with defaults
const GREETING_PREFIX = process.env.GREETING_PREFIX || 'Aloha';
const GREETING_AUDIENCE = process.env.GREETING_AUDIENCE || 'World';

_getMessage = (prefix, audience) => {
  return `${prefix} ${audience}!`;
};

app.get('/hello', function(req,res) {
  res.send(_getMessage(GREETING_PREFIX, GREETING_AUDIENCE));
});

app.get('/goodbye', function(req,res) {
  res.send(_getMessage(GREETING_PREFIX, GREETING_AUDIENCE));
});

module.exports.handler = serverless(app);