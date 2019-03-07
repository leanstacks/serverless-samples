const serverless = require('serverless-http');
const express = require('express');
const app = express();

// GET get all users endpoint
app.get('/users', function(req,res) {
  const users = [{
    userId: 'mwarman',
    name: 'Matt Warman'
  },{
    userId: 'jmailbot',
    name: 'Joe Mailbot'
  }];

  res.json(users);
});

module.exports.handler = serverless(app);