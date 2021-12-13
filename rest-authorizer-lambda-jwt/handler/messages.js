const serverless = require('serverless-http');
const express = require('express');
const app = express();

/**
 * Sample, static message data.
 */
const messages = [{
  id: 'hello',
  message: 'Hello World!'
}, {
  id: 'goodbye',
  message: 'Goodbye World!'
}, {
  id: 'default',
  message: 'What\'s up?'
}];

/**
 * Find a single message by message identifier.
 * @param {string} id A message identifier.
 * @returns A message object.
 */
const _findMessage = (id) => {
  return messages.find((message) => message.id === id);
};

/**
 * Handles GET requests to the '/messages/:messageId' endpoint.
 */
app.get('/messages/:messageId', function (req, res) {

  console.log('Route::/messages/:messageId');
  // the context contains any attributes passed from the authorizer function
  console.log(`request context:\n${JSON.stringify(req.context, null, 2)}`);

  try {

    // process request
    const messageId = req.params.messageId;

    // fetch message
    let message = _findMessage(messageId);
    if (!message) {
      message = _findMessage('default');
    }

    // create response
    res.json(message);

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
 * Handles GET requests to the '/messages' endpoint.
 */
app.get('/messages', function (req, res) {

  console.log('Route::/messages');
  // the context contains any attributes passed from the authorizer function
  console.log(`context:\n${JSON.stringify(req.context, null, 2)}`);

  try {

    // create response
    res.json(messages);

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