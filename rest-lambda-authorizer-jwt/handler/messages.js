const serverless = require('serverless-http');
const express = require('express');
const app = express();

const messages = [{
  id: 'hello',
  message: 'Hello World!'
},{
  id: 'goodbye',
  message: 'Goodbye World!'
},{
  id: 'default',
  message: 'What\'s up?'
}];

const _findMessage = (id) => {
  return messages.find((m) => m.id === id);
};

/**
 * Handles GET requests to the '/messages/:messageId' endpoint.
 */
app.get('/messages/:messageId', function(req,res) {
  // the context contains any attributes passed from the authorizer function
  console.log(`context:\n${JSON.stringify(req.context, null, 2)}`);

  const messageId = req.params.messageId;

  let message = _findMessage(messageId);

  if (!message) {
    message = _findMessage('default');
  }

  res.json(message);
});

/**
 * Handles GET requests to the '/messages' endpoint.
 */
app.get('/messages', function(req,res) {
  // the context contains any attributes passed from the authorizer function
  console.log(`context:\n${JSON.stringify(req.context, null, 2)}`);

  res.json(messages);
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