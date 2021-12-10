const UnauthorizedError = require('./error/unauthorized-error');

/**
 * Handler function for the authorizer. This is a simple example illustrates 
 * four possible outcomes from the invocation of a Lambda Authorizer 
 * (formerly called a Custom Authorizer).
 * @param {Object} event The Lambda function event.
 * @param {Object} context The Lambda function context.
 * @returns A Lambda Authorizer policy document.
 */
exports.authorize = async (event, context) => {

  console.log('Authorizer::authorize');
  console.log(`event: ${JSON.stringify(event, null, 2)}`);
  console.log(`context: ${JSON.stringify(context, null, 2)}`);

  try {

    const { authorizationToken, methodArn } = event;
    switch (authorizationToken.toLowerCase()) {
      case 'allow':
        return _generatePolicy('user', 'Allow', methodArn);
      case 'deny':
        return _generatePolicy('user', 'Deny', methodArn);
      case 'unauthorized':
        throw new UnauthorizedError(); // Returns a 401 Unauthorized response
      default:
        throw new Error(); // anything else; return 500 Invalid token
    }

  } catch (error) {

    if (error.name === 'UnauthorizedError') {
      throw error;
    }
    console.log('Authorizer error. Detail: ', error);
    throw new Error('Error: Invalid token');

  }

};

/**
 * Generate the AWS Policy document JSON describing the access to the 
 * requested API Gateway resource.
 * @param {string} principalId The principal requesting access.
 * @param {string} [effect='Deny'] Allow or deny access.
 * @param {string} [resource='*'] The resource to which access is requested.
 * @returns A Lambda Authorizer policy document.
 */
const _generatePolicy = (principalId, effect = 'Deny', resource = '*') => {
  const authResponse = {
    principalId
  };

  if (effect && resource) {
    const policyDocument = {
      Version: '2012-10-17',
      Statement: []
    };
    const statement = {
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource
    };
    policyDocument.Statement.push(statement);
    authResponse.policyDocument = policyDocument;
  }

  // Optional attributes which are passed to target handler
  authResponse.context = {
    stringKey: 'string value',
    numberKey: 123,
    booleanKey: true
  };

  return authResponse;
};
