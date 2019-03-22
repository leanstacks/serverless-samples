const token = require('../auth/token');

/**
 * Handler function for the authorizer. This is a simple example illustrates: 
 * retrieving the token from the event data, verifying the token, and 
 * returning an access policy allowing or denying access to the API.
 * @param {Object} event The Lambda function event.
 * @param {Object} context The Lambda function context.
 * @param {*} callback The callback function.
 */
exports.handler = (event, context, callback) => {
  console.log(`event:\n${JSON.stringify(event, null, 2)}`);

  try {
    /* Verify the JWT. Throws error if verification fails. */
    const tokenData = token.verify(event.authorizationToken);
    console.log(`tokenData:\n${JSON.stringify(tokenData, null, 2)}`);

    /* Grant access to all resources in the API, not just the one in this request */
    const resourceParts = event.methodArn.split('/');
    const resource = resourceParts[0] + '/' + resourceParts[1] + '/*';

    callback(null, _generatePolicy(tokenData, 'Allow', resource));
  } catch(err) {
    console.log(`verification error:\n${JSON.stringify(err, null, 2)}`);
    callback("Unauthorized", null);
  }

};

/**
 * Generate the AWS Policy document JSON describing the access to the 
 * requested API Gateway resource.
 * @param {Object} tokenData The principal requesting access.
 * @param {string} effect Allow or deny access.
 * @param {string} resource The resource to which access is requested.
 */
const _generatePolicy = (tokenData, effect = 'Deny', resource = '*') => {
  const authResponse = {
    principalId: tokenData.sub
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
    apiKey: tokenData.apiKey,
    audience: tokenData.aud,
    subject: tokenData.sub
  };

  console.log(`auth response:\n${JSON.stringify(authResponse, null, 2)}`);

  return authResponse;
};
