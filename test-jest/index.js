const serverless = require('serverless-http');
const express = require('express');
const app = express();

_getGreeting = () => {
  return 'Hello World!';
};

app.get('/', function(req,res) {
  res.send(_getGreeting());
});

module.exports.handler = serverless(app);
// export functions for testing
module.exports.getGreeting = _getGreeting;