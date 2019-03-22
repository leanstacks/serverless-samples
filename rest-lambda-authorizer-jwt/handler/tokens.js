const serverless = require('serverless-http');
const express = require('express');
const app = express();

const token = require('../auth/token');

/**
 * Handles POST requests to the '/auth/request_token' endpoint.
 */
app.post('/auth/request_token', function(req,res) {
  const apiKey = req.header('x-auth-key');
  console.log(`api key: ${apiKey}`);

  /* Do some authentication of the API KEY here. */
  const validKey = !!apiKey;
  if (!validKey) {
    res.status(400).json({
      code: 400,
      message: 'Invalid API key'
    });
  }

  /* Generate JSON Web Token for API access. */
  const jwt = token.generate(apiKey);
  console.log(`token:\n${jwt}`);

  res.json({
    accessToken: jwt
  });
});

/**
 * Export the serverless-http wrapped Express application to handle all 
 * API Gateway events and process them through the Express router.
 */
module.exports.handler = serverless(app);
