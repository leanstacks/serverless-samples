/**
 * Delete user controller module.
 * @module controller/user-delete
 */
const UserService = require('../service/user-service');

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

// Controller responsibilities:
// * parse request
// * validate request
// * format response

/**
 * An Express handler (a.k.a. Controller) function to delete a User.
 * @param {Object} req An Express request object.
 * @param {Object} res An Express response object.
 */
const deleteUser = async (req, res) => {

  console.log(`Controller::deleteUser`);

  try {

    if (!_isValid(req)) {
      throw new ValidationError();
    }

    const user = req.body;
    await UserService.delete(user.userId);

    res.append('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    res.status(204);
    res.end();

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
  const { userId } = req.body;

  const hasUserId = !!userId && typeof userId === 'string' && userId === req.params.userId;

  return hasUserId;
};

module.exports = deleteUser;