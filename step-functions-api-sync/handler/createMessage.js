const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
app.use(bodyParser.json({ strict: false }));

const { startExecutionAndWait } = require('../stepf/execution');

/**
 * The create message endpoint.
 */
app.post('/messages', function (req, res) {

  // validate request
  const { audience } = req.body;
  if (typeof audience !== 'string') {
    res.status(400).json({ message: '"audience" must be a string' });
  }

  // perform business logic, i.e. invoke the step function state machine
  startExecutionAndWait(req.body)
    .then((output) => {
      console.log(`Execution result.\n${JSON.stringify(output, null, 2)}`);
      res.json(output);
    })
    .catch((err) => {
      console.log(`Error occurred. Detail:\n${JSON.stringify(err, null, 2)}`);
      res.status(500).json(err);
    });

});

module.exports.handle = serverless(app);