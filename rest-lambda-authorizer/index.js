const serverless = require('serverless-http');
const express = require('express');
const app = express();

/**
 * Handles GET requests to the '/hello' endpoint.
 */
app.get('/hello', function(req,res) {
  // the context contains any attributes passed from the authorizer function
  console.log(`context: ${JSON.stringify(req.context, null, 2)}`);

  res.json({
    message: 'Hello World!'
  });
});

/**
 * Export the serverless-http wrapped Express application to handle all 
 * API Gateway events and process them through the Express router.
 * The second parameter to the serverless function is middleware which 
 * adds the requestContext attribute of the Lambda event object to the 
 * Express request object, making it available to all Express handler
 * methods.
 */
module.exports.handler = serverless(app, {
  request: (req, event, context) => {
    req.context = event.requestContext;
  }
});