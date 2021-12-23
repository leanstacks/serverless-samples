/**
 * List users controller module.
 * @module controller/user-list
 */
const UserService = require('../service/user-service');

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

// Controller responsibilities:
// * parse request
// * validate request
// * format response

/**
 * An Express handler (a.k.a. Controller) function which lists all Users.
 * @param {Object} req An Express request object.
 * @param {Object} res An Express response object.
 */
const listUsers = async (req, res) => {

  console.log(`Controller::listUsers`);

  try {

    const users = await UserService.list();
    res.append('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    res.json(users);

  } catch (error) {

    console.log('Error handling request. Detail:', error);
    const { code = 500, name, message, status = 500 } = error;
    res.append('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    res.status(status);
    res.json({
      name,
      code,
      message
    });

  }
};

module.exports = listUsers;