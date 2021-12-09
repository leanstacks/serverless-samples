/**
 * Update user controller module.
 * @module controller/user-update
 */
const UserService = require('../service/user-service');
const ValidationError = require('../error/validation-error');

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

// Controller responsibilities:
// * parse request
// * validate request
// * format response

/**
 * An Express handler (a.k.a. Controller) function to update a User.
 * @param {Object} req An Express request object.
 * @param {Object} res An Express response object.
 */
const updateUser = async (req, res) => {

  console.log(`Controller::updateUser`);

  try {

    if (!_isValid(req)) {
      throw new ValidationError();
    }

    const user = await UserService.update(req.body);

    res.append('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    if (!!user) {
      // user updated
      res.json(user);
    } else {
      // not found
      res.status(404);
      res.end();
    }

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
  const { name, userId } = req.body;

  const hasUserId = !!userId && typeof userId === 'string' && userId === req.params.userId;
  const hasName = !!name && typeof name === 'string';

  return hasUserId && hasName;
};

module.exports = updateUser;