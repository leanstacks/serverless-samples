const { DynamoDBDocumentClient, ScanCommand, GetCommand, PutCommand, UpdateCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const serverless = require('serverless-http');
const express = require('express');
const app = express();

// environment variables
const IS_OFFLINE = process.env.IS_OFFLINE || false;
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const USERS_TABLE = process.env.USERS_TABLE;

// configure DynamoDBClient
const localDbConfig = {
  endpoint: 'http://localhost:8000',
  region: 'localhost'
};
const hostedDbConfig = {
  region: AWS_REGION
};

// configure the AWS DynamoDBDocumentClient
const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false
};
const unmarshallOptions = {
  wrapNumbers: false
};
const translateConfig = { marshallOptions, unmarshallOptions };

// create the DynamoDBDocumentClient
const dbConfig = IS_OFFLINE ? localDbConfig : hostedDbConfig;
const dbClient = new DynamoDBClient(dbConfig);
const dynamoDb = DynamoDBDocumentClient.from(dbClient, translateConfig);

// configure Express middleware
app.use(express.json({ strict: false }));

// configure Express routes
// GET all Users route
app.get('/users', function (req, res) {
  const params = {
    TableName: USERS_TABLE
  };

  // fetch all items from table
  dynamoDb.send(new ScanCommand(params))
    .then(result => {
      res.json(result.Items);
    })
    .catch(error => {
      console.log('Problem fetching Users from DB.', error);
      res.status(400).json({ error: 'Could not list users' });
    });
});

// GET User (by ID) route
app.get('/users/:userId', function (req, res) {
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId: req.params.userId,
    }
  };

  // fetch item from table
  dynamoDb.send(new GetCommand(params))
    .then(result => {
      if (result.Item) {
        const { userId, name } = result.Item;
        res.json({ userId, name });
      } else {
        res.status(404).end();
      }
    })
    .catch(error => {
      console.log('Problem fetching User from DB.', error);
      res.status(400).json({ error: 'Could not find user' });
    });
});

// POST User (create) route
app.post('/users', function (req, res) {
  const { userId, name } = req.body;

  // validate request
  if (!userId || typeof userId !== 'string') {
    res.status(400).json({ error: 'Validation failed' });
  } else if (!name || typeof name !== 'string') {
    res.status(400).json({ error: 'Validation failed' });
  }

  // control attributes stored in DB; do not store request body
  const userObj = {
    userId,
    name
  };

  const params = {
    TableName: USERS_TABLE,
    Item: userObj,
    ConditionExpression: "attribute_not_exists(userId)"
  };

  // create item in table and send response
  dynamoDb.send(new PutCommand(params))
    .then(result => {
      res.status(201).json(userObj);
    })
    .catch(error => {
      if (error.name === 'ConditionalCheckFailedException') {
        res.status(400).json({ error: 'User exists' });
      } else {
        console.log('Problem creating User in DB.', error);
        res.status(400).json({ error: 'Could not create user' });
      }
    });
});

// PUT User (update) route
app.put('/users/:userId', function (req, res) {
  const { userId, name } = req.body;

  // validate request
  if (!userId || typeof userId !== 'string' || userId !== req.params.userId) {
    res.status(400).json({ error: 'Validation failed' });
  }
  if (!name || typeof name !== 'string') {
    res.status(400).json({ error: 'Validation failed' });
  }

  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId
    },
    UpdateExpression: "set #nm = :nm",
    ConditionExpression: "userId = :uid",
    ExpressionAttributeNames: {
      "#nm": "name"
    },
    ExpressionAttributeValues: {
      ":nm": name,
      ":uid": userId
    },
    ReturnValues: "ALL_NEW"
  };

  // update item in table and send response
  dynamoDb.send(new UpdateCommand(params))
    .then(result => {
      res.json(result.Attributes);
    })
    .catch(error => {
      if (error.name === 'ConditionalCheckFailedException') {
        // not found
        res.status(404).end();
      } else {
        console.log('Error updating user in DB.', error);
        res.status(400).json({ error: 'Could not update user' });
      }
    });
});

// DELETE User route
app.delete('/users/:userId', function (req, res) {
  const { userId } = req.params;
  const params = {
    TableName: USERS_TABLE,
    Key: {
      userId
    },
    ConditionExpression: "userId = :uid",
    ExpressionAttributeValues: {
      ":uid": userId
    }
  };

  // delete item from table and send response
  dynamoDb.send(new DeleteCommand(params))
    .then(result => {
      res.status(204).end();
    })
    .catch(error => {
      if (error.name === 'ConditionalCheckFailedException') {
        res.status(404).end();
      } else {
        console.log('Error deleting user from DB.', error);
        res.status(400).json({ error: 'Could not delete user' });
      }
    });
});

// wrap Express with the serverless-http plugin
module.exports.handler = serverless(app);