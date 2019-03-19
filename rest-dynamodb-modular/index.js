const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const database = require('./database/database');
const user = require('./model/user');

app.use(bodyParser.json({ strict: false }));

/**
 *  Get User (by id) endpoint
 */
app.get('/users/:userId', function (req, res) {

  /**
   * business logic is in model/user, not the handler
   * handler responsibilities:
   * - parse request
   * - validate request
   * - format response
   */
  user.get(req.params.userId, database)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ code: 404, message: 'Not found' });
      }
    })
    .catch(error => {
      res.status(400).json(error);
    });

});

/**
 * Get All Users endpoint
 */
app.get('/users', function (req, res) {

  user.list(database)
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(400).json(error);
    });

});

/**
 * Create User endpoint
 */
app.post('/users', function (req, res) {

  // validate request
  const { userId, name } = req.body;
  if (typeof userId !== 'string') {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }

  user.create(req.body, database)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      res.status(400).json(error);
    });

});

/**
 * Update User endpoint
 */
app.put('/users/:userId', function (req, res) {

  // validate request
  const { userId } = req.params;
  const { name } = req.body;
  if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const userObj = {
    userId,
    name
  };

  user.update(userObj, database)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        res.status(404).json({ code: 404, message: 'Not found' });
      }
    })
    .catch(error => {
      res.status(400).json(error);
    });

});

/**
 * Delete User endpoint
 */
app.delete('/users/:userId', function (req, res) {
  const { userId } = req.params;

  user.delete(userId, database)
    .then(() => {
      res.status(204).end();
    })
    .catch(error => {
      res.status(400).json(error);
    });

});

module.exports.handler = serverless(app);