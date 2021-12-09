/**
 * Find user controller module.
 * @module controller/user-find
 */
const UserService = require('../service/user-service');

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

// Controller responsibilities:
// * parse request
// * validate request
// * format response

/**
 * An Express handler (a.k.a. Controller) function which finds a User 
 * by the identifier.
 * @param {Object} req An Express request object.
 * @param {Object} res An Express response object.
 */
const findUser = async (req, res) => {

  console.log(`Controller::findUser`);

  try {

    const { userId } = req.params;
    const user = await UserService.find(userId);

    res.append('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    if (!!user) {
      res.json(user);
    } else {
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

module.exports = findUser;