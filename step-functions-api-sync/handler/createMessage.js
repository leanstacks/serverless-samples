const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.use(express.json({ strict: false }));

const { startExecutionAndWait } = require('../stepf/execution');

/**
 * Route: POST /messages
 * A route handler function to create a message.
 */
app.post('/messages', function (req, res) {

  console.log('Route::createMessage');

  // validate request
  const { audience } = req.body;
  if (!audience || typeof audience !== 'string') {

    // request invalid
    res.status(400).json({ message: '"audience" must be a string' });

  } else {

    // request valid
    // perform business logic, i.e. invoke the step function state machine
    startExecutionAndWait(req.body)
      .then((output) => {
        console.log(`Execution result.\n${JSON.stringify(output, null, 2)}`);
        res.json(output);
      })
      .catch((err) => {
        console.log('Error occurred. Detail: ', error);
        res.status(500).json(err);
      });

  }

});

module.exports.handle = serverless(app);