const { 
  buildGetUserParams,
  buildListUsersParams,
  buildCreateUserParams,
  buildUpdateUserParams,
  buildDeleteUserParams
} = require('../../params/user');
const user = require('../fixtures/user');

test('should build getUser params object', () => {
  const params = buildGetUserParams(user.userId);

  expect(params).toEqual({
    TableName: 'users-table',
    Key: {
      userId: user.userId
    }
  });
});

test('should build listUsers params object', () => {
  const params = buildListUsersParams();

  expect(params).toEqual({
    TableName: 'users-table'
  });
});

test('should build createUser params object', () => {
  const params = buildCreateUserParams(user);

  expect(params).toEqual({
    TableName: 'users-table',
    Item: {
      userId: user.userId,
      name: user.name
    },
    ConditionExpression: "userId <> :id",
    ExpressionAttributeValues: {
      ":id": user.userId
    }
  });
});

test('should build updateUser params object', () => {
  const params = buildUpdateUserParams(user);

  expect(params).toEqual({
    TableName: 'users-table',
    Key: {
      userId: user.userId
    },
    UpdateExpression: "set #nm = :nm",
    ConditionExpression: "userId = :id",
    ExpressionAttributeNames: {
      "#nm": "name"
    },
    ExpressionAttributeValues: {
      ":id": user.userId,
      ":nm": user.name
    },
    ReturnValues:"UPDATED_NEW"
  });
});

test('should build deleteUser params object', () => {
  const params = buildDeleteUserParams(user.userId);

  expect(params).toEqual({
    TableName: 'users-table',
    Key: {
      userId: user.userId
    }
  });
});
