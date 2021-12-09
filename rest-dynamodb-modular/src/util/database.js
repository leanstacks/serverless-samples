const { DynamoDBDocumentClient, BatchWriteCommand, DeleteCommand, GetCommand, PutCommand, QueryCommand, ScanCommand, UpdateCommand } = require('@aws-sdk/lib-dynamodb');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

const _ddbClient = new DynamoDBClient({ region: AWS_REGION });

const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false
};
const unmarshallOptions = {
  wrapNumbers: false
};
const translateConfig = { marshallOptions, unmarshallOptions };
const _ddbDocClient = DynamoDBDocumentClient.from(_ddbClient, translateConfig);

exports.batchWrite = async (params) => {
  return _ddbDocClient.send(new BatchWriteCommand(params));
};

exports.delete = async (params) => {
  return _ddbDocClient.send(new DeleteCommand(params));
};

exports.get = async (params) => {
  return _ddbDocClient.send(new GetCommand(params));
};

exports.query = async (params) => {
  return _ddbDocClient.send(new QueryCommand(params));
};

exports.scan = async (params) => {
  return _ddbDocClient.send(new ScanCommand(params));
};

exports.put = async (params) => {
  return _ddbDocClient.send(new PutCommand(params));
};

exports.update = async (params) => {
  return _ddbDocClient.send(new UpdateCommand(params));
};
