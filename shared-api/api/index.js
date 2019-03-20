const serverless = require('serverless-http');
const express = require('express');
const app = express();

const API_VERSION_MAJOR = process.env.API_VERSION_MAJOR || 'M';
const API_VERSION_MINOR = process.env.API_VERSION_MINOR || 'm';
const API_VERSION_PATCH = process.env.API_VERSION_PATCH || 'p';

/**
 * Handles GET requests to the '/info' endpoint.
 */
app.get('/info', function(req,res) {
  const release = `${API_VERSION_MAJOR}.${API_VERSION_MINOR}.${API_VERSION_PATCH}`;

  res.json({
    version: API_VERSION_MAJOR,
    release
  });
});

/**
 * Export the serverless-http wrapped Express application to handle all 
 * API Gateway events and process them through the Express router.
 */
module.exports.handler = serverless(app);