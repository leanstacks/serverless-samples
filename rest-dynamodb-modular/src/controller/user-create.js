/**
 * Create user controller module.
 * @module controller/user-create
 */

const UserService = require('../service/user-service');
const ValidationError = require('../error/validation-error');

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

// Controller responsibilities:
// * parse request
// * validate request
// * format response

/**
 * An Express handler (a.k.a. Controller) function to create a User.
 * @param {Object} req An Express request object.
 * @param {Object} res An Express response object.
 */
const createUser = async (req, res) => {

  console.log(`Controller::createUser`);

  try {

    if (!_isValid(req)) {
      throw new ValidationError();
    }

    const user = await UserService.create(req.body);

    res.append('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    res.status(201);
    res.json(user);

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

/**
 * Validate the request.
 * @param {Object} req An Express request object.
 */
const _isValid = (req) => {
  const { name } = req.body;

  const hasName = !!name && typeof name === 'string';

  return hasName;
};

module.exports = createUser;