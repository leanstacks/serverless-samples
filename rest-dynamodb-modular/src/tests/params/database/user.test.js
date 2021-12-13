const DatabaseParamsFactory = require('../../../params/database/user');
const { userFixture } = require('../../fixtures/user');

test('should build findUser params object', () => {
  const params = DatabaseParamsFactory.build('findUser', { userId: userFixture.userId });

  expect(params).toEqual({
    TableName: 'users-table',
    Key: {
      userId: userFixture.userId
    }
  });
});

test('should build listUsers params object', () => {
  const params = DatabaseParamsFactory.build('listUsers');

  expect(params).toEqual({
    TableName: 'users-table'
  });
});

test('should build createUser params object', () => {
  const params = DatabaseParamsFactory.build('createUser', { user: userFixture })

  expect(params).toEqual({
    TableName: 'users-table',
    Item: {
      userId: userFixture.userId,
      name: userFixture.name
    },
    ConditionExpression: "attribute_not_exists(userId)"
  });
});

test('should build updateUser params object', () => {
  const userObj = {
    ...userFixture,
    updatedAt: '2021-12-09T00:00:00.000Z'
  };
  const params = DatabaseParamsFactory.build('updateUser', { user: userObj });

  expect(params).toEqual({
    TableName: 'users-table',
    Key: {
      userId: userObj.userId
    },
    UpdateExpression: "set #nm = :nm, updatedAt = :ua",
    ConditionExpression: "userId = :uid",
    ExpressionAttributeNames: {
      "#nm": "name"
    },
    ExpressionAttributeValues: {
      ":uid": userObj.userId,
      ":nm": userObj.name,
      ":ua": userObj.updatedAt
    },
    ReturnValues: "ALL_NEW"
  });
});

test('should build deleteUser params object', () => {
  const params = DatabaseParamsFactory.build('deleteUser', { userId: userFixture.userId });

  expect(params).toEqual({
    TableName: 'users-table',
    Key: {
      userId: userFixture.userId
    }
  });
});
