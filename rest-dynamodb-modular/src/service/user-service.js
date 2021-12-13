/**
 * UserService module.
 * @module service/user-service
 */

const ValidationError = require('../error/validation-error');
const DatabaseParamsFactory = require('../params/database/user');
const database = require('../util/database');

// Service responsibilities:
// * implement business logic / conditions / rules
// * sequence business logic
// * store data

/**
 * Find a User by the identifier.
 * @param {string} userId A User identifier.
 * @returns {Promise<User|null,Error>} A Promise which resolves to a User object if found or null if not found; otherwise rejects with an error.
 */
exports.find = async (userId) => {

  console.log('UserService::find');

  const params = DatabaseParamsFactory.build('findUser', { userId });
  console.log(`params:\n${JSON.stringify(params, null, 2)}`);
  const data = await database.get(params);

  return data.Item;

};

/**
 * List all Users.
 * @returns {Promise<User[], Error>}A Promise which resolves to a collection of User objects; otherwise rejects with an error.
 */
exports.list = async () => {

  console.log('UserService.list');

  const params = DatabaseParamsFactory.build('listUsers');
  console.log(`params:\n${JSON.stringify(params, null, 2)}`);
  const data = await database.scan(params);

  return data.Items;

};

/**
 * Create a User.
 * @param {Object} user - A User object.
 * @param {string} user.userId - A unique identifier.
 * @param {string} user.name - A full name.
 * @returns {Promise<User, Error>} A Promise which resolves to the created User object if successful; otherwise rejects with an error.
 */
exports.create = async (user) => {

  console.log('UserService::create');

  try {

    const { name, userId } = user;
    const createdAt = new Date().toISOString();

    const userObj = {
      userId,
      name,
      createdAt
    };
    console.log(`userObj:\n${JSON.stringify(userObj, null, 2)}`);

    const params = DatabaseParamsFactory.build('createUser', { user: userObj });
    console.log(`params:\n${JSON.stringify(params, null, 2)}`);
    await database.put(params);

    return userObj;

  } catch (error) {

    if (error.name === 'ConditionalCheckFailedException') {
      throw new ValidationError('User values in use.');
    }
    console.log('Error caught in service operation. Detail: ', error);
    throw error;

  }

};

/**
 * Update a User.
 * @param {Object} user - A User object.
 * @param {string} user.userId - A unique identifier.
 * @param {string} user.name - A full name.
 * @returns {Promise<User|null,Error>}A Promise which resolves to the updated User object if successful or null if not found; otherwise rejects with an error.
 */
exports.update = async (user) => {

  console.log('UserService::update');

  try {
    const { name, userId } = user;

    const updatedAt = new Date().toISOString();

    const userObj = {
      userId,
      name,
      updatedAt
    };
    console.log(`userObj:\n${JSON.stringify(userObj, null, 2)}`);

    const params = DatabaseParamsFactory.build('updateUser', { user: userObj });
    console.log(`params:\n${JSON.stringify(params, null, 2)}`);
    const data = await database.update(params);

    return data.Attributes;

  } catch (error) {

    if (error.name === 'ConditionalCheckFailedException') {
      // not found
      return null;
    }
    console.log('Error caught in service operation. Detail: ', error);
    throw error;

  }

};

/**
 * Delete a User.
 * @param {string} userId - A User identifier.
 * @returns {Promise<null, Error>} A Promise which resolves to empty if successful; otherwise rejects with an error.
 */
exports.delete = async (userId) => {

  console.log('UserService::delete');

  const params = DatabaseParamsFactory.build('deleteUser', { userId });
  console.log(`params:\n${JSON.stringify(params, null, 2)}`);
  await database.delete(params);

};