/**
 * User database parameters module.
 * @module params/database/user
 */
const USERS_TABLE = process.env.USERS_TABLE || 'users-table';

exports.buildGetUserParams = ({ userId }) => {
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

exports.buildCreateUserParams = ({ user }) => {
  return {
    TableName: USERS_TABLE,
    Item: user,
    ConditionExpression: "attribute_not_exists(userId)"
  };
};

exports.buildUpdateUserParams = ({ user }) => {
  const { userId, name, updatedAt } = user;
  return {
    TableName: USERS_TABLE,
    Key: {
      userId
    },
    UpdateExpression: "set #nm = :nm, updatedAt = :ua",
    ConditionExpression: "userId = :uid",
    ExpressionAttributeNames: {
      "#nm": "name"
    },
    ExpressionAttributeValues: {
      ":uid": userId,
      ":nm": name,
      ":ua": updatedAt
    },
    ReturnValues: "ALL_NEW"
  };
}

exports.buildDeleteUserParams = ({ userId }) => {
  return {
    TableName: USERS_TABLE,
    Key: {
      userId
    }
  };
};

/**
 * Builds a formatted parameters object for a DynamoDB database operation.
 * @param {string} [operation=''] - The database operation.
 * @param {Object} [options] - An optional object with data to build the parameters.
 * @returns {Object} A formatted database parameters object.
 */
exports.build = (operation = '', options) => {
  switch (operation) {
    case 'findUser':
      return this.buildGetUserParams(options);
    case 'listUsers':
      return this.buildListUsersParams(options);
    case 'createUser':
      return this.buildCreateUserParams(options);
    case 'updateUser':
      return this.buildUpdateUserParams(options);
    case 'deleteUser':
      return this.buildDeleteUserParams(options);
    default:
      return {};
  };
};