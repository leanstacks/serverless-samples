const AWS = require('aws-sdk');

let _instance;

if (!_instance) {
  const dbOptions = {};
  _instance = new AWS.DynamoDB.DocumentClient(dbOptions); 
}

module.exports = _instance;
