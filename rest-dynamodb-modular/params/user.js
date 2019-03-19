const USERS_TABLE = process.env.USERS_TABLE || 'users-table';

exports.buildGetUserParams = (userId) => {
  return {
    TableName: USERS_TABLE,
    Key: {
      userId
    }
  };
};

exports.buildListUsersParams = () => {
  return {
    TableName: USERS_TABLE
  };
};

exports.buildCreateUserParams = (user) => {
  const { userId, name } = user;
  return {
    TableName: USERS_TABLE,
    Item: {
      userId,
      name
    },
    ConditionExpression: "userId <> :id",
    ExpressionAttributeValues: {
      ":id": userId
    }
  };
};

exports.buildUpdateUserParams = (user) => {
  const { userId, name } = user;
  return {
    TableName: USERS_TABLE,
    Key: {
      userId
    },
    UpdateExpression: "set #nm = :nm",
    ConditionExpression: "userId = :id",
    ExpressionAttributeNames: {
      "#nm": "name"
    },
    ExpressionAttributeValues: {
      ":id": userId,
      ":nm": name
    },
    ReturnValues:"UPDATED_NEW"
  };
}

exports.buildDeleteUserParams = (userId) => {
  return {
    TableName: USERS_TABLE,
    Key: {
      userId
    }
  };
};