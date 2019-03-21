const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const AWS = require('aws-sdk');

const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }));

// Get User endpoint
app.get('/users/:userId', function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    }
  };

  dynamoDb.get(params, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not get user' });
    }
    if (result.Item) {
      const {userId, name} = result.Item;
      res.json({ userId, name });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });
});

// Create User endpoint
app.post('/users', function (req, res) {
  const { userId, name } = req.body;
  if (typeof userId !== 'string') {
    res.status(400).json({ error: '"userId" must be a string' });
  } else if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Item: {
      userId,
      name
    }
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not create user' });
    }
    res.status(201).json({ userId, name });
  });
});

// Update User endpoint
app.put('/users/:userId', function (req, res) {
  const { userId } = req.params;
  const { name } = req.body;
  if (typeof name !== 'string') {
    res.status(400).json({ error: '"name" must be a string' });
  }

  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId
    },
    UpdateExpression: "set #nm = :nm",
    ExpressionAttributeNames: {
      "#nm": "name"
    },
    ExpressionAttributeValues: {
      ":nm": name,
    },
    ReturnValues:"UPDATED_NEW"
  };

  dynamoDb.update(params, (error, data) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not update user' });
    }
    res.json({ 
      userId, 
      name: data.Attributes.name
    });
  });
});

// Delete User endpoint
app.delete('/users/:userId', function (req, res) {
  const { userId } = req.params;
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId
    }
  };

  dynamoDb.delete(params, (error) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: 'Could not delete user' });
    }
    res.status(204).end();
  });
});

module.exports.handler = serverless(app);