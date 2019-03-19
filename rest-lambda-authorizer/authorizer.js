/**
 * Handler function for the authorizer. This is a simple example illustrates 
 * four possible outcomes from the invocation of a Lambda Authorizer 
 * (formerly called a Custom Authorizer).
 * @param {Object} event The Lambda function event.
 * @param {Object} context The Lambda function context.
 * @param {*} callback The callback function.
 */
exports.authorize = (event, context, callback) => {
  console.log(`event: ${JSON.stringify(event, null, 2)}`);
  console.log(`context: ${JSON.stringify(context, null, 2)}`);

  const token = event.authorizationToken;
  switch (token.toLowerCase()) {
    case 'allow':
      callback(null, _generatePolicy('user', 'Allow', event.methodArn));
      break;
    case 'deny':
      callback(null, _generatePolicy('user', 'Deny', event.methodArn));
      break;
    case 'unauthorized':
      callback("Unauthorized"); // Returns a 401 Unauthorized response
      break;
    default:
      callback("Error: Invalid token");
  }

};

/**
 * Generate the AWS Policy document JSON describing the access to the 
 * requested API Gateway resource.
 * @param {string} principalId The principal requesting access.
 * @param {string} effect Allow or deny access.
 * @param {string} resource The resource to which access is requested.
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
