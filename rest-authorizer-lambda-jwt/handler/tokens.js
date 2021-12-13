const serverless = require('serverless-http');
const express = require('express');
const app = express();

const token = require('../auth/token');

/**
 * Handles POST requests to the '/auth/request_token' endpoint.
 */
app.post('/auth/request_token', function (req, res) {

  console.log('Route::/auth/request_token');

  try {

    // process request
    const apiKey = req.header('x-auth-key');

    // validate the API key
    const validKey = !!apiKey;
    if (!validKey) {
      res.status(400);
      res.json({
        name: 'ValidationError',
        code: 400,
        message: 'Invalid API key'
      });
    }

    // generate API token
    const jwt = token.generate(apiKey);

    // create response
    res.json({
      accessToken: jwt
    });

  } catch (error) {

    console.log('Error handling request. Detail:', error);
    const { code = 500, name, message, status = 500 } = error;
    res.status(status);
    res.json({
      name,
      code,
      message
    });

  }

});

/**
 * Export the serverless-http wrapped Express application to handle all 
 * API Gateway events and process them through the Express router.
 */
module.exports.handler = serverless(app);
