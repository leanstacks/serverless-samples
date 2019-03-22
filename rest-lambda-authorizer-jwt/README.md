# Sample: REST Services with Lambda Authorizer and JWT

This sample serverless application is an example of how to implement a Lambda Authorizer, formerly called a *Custom Authorizer*, with [JSON Web Tokens (JWT)][auth0-jwt-intro] for a REST API.

## About the Example

### Scenario

API clients are issued an _API key_. Clients must call the `POST /auth/request_token` endpoint, passing their API key in the `X-Auth-Key` header. If the API key is valid, the endpoint returns a simple JWT access token.

Using the access token, API clients may call any API endpoint passing the access token in the `X-Auth-Token` header. There are two secured endpoints available:
- `GET /messages`
- `GET /messages/:messageId` (hint: try _hello_ or _goodbye_ or any value)

The messages endpoints are secured by a Lambda Authorizer function. The authorizer function receives the access token and verifies it. If verification is successful, the authorizer function returns a policy document which grants access to all endpoints in the API. If verification fails, a policy document denying access to the API is returned. The response from the authorizer function is cached, by default, for five minutes.

### Considerations

For the sake of simplicity the source code for this example is contained within a single project. In the real world, this source code would probably be broken into multiple projects to separate the concerns of authentication/authorization from business features.

In this example, the public/private keys used to sign the tokens are included in the serverless specification YAML markup. These values should be stored in a secure location with restricted access. A good option is the [AWS Systems Manager Parameter Store][aws-ssm-param].

## How to Use

### Install Dependencies

Install the project dependencies with the Yarn package manager. Navigate to the application base directory and issue the following command:

```
yarn install
```

### Run the Application

Run the serverless application. Navigate to the application base directory and issue the following command:

```
sls deploy
```

The Serverless Framework packages and deploys the application to AWS. The framework writes information about the deployed application to the console. Be sure to note the endpoint URL(s) to use in testing.

To test the deployed application, you may use cURL, or better yet, a REST client such as Postman.

First obtain an access token. The API key value does not matter.

```
POST /auth/request_token
Accept: application/json
X-Auth-Key: abc123
```

Retrieve the access token from the response body and invoke any of the secured *messages* endpoints. For example, to list all messages send a request like the one below.

```
GET /messages
Accept: application/json
X-Auth-Token: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJhcGlrZXkiLCJpYXQiOjE1
```

Try omitting the `X-Auth-Token` header and see what happens.

### Remove the Application

To remove the serverless application from AWS, navigate to the application base directory and issue the following command:

```
sls remove
```

## See Also
[Strategies for implementing user authentication in serverless applications][sls-authn]  
[Configure HTTP Endpoints with Custom Authorizers](https://serverless.com/framework/docs/providers/aws/events/apigateway#http-endpoints-with-custom-authorizers "API Gateway Events with Lambda Authorizers | Serverless Docs")  
[Use API Gateway Lambda Authorizers](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html "Use API Gateway Lambda Authorizers | AWS Docs")  
[Reference Variables using the AWS Systems Manager Parameter Store][aws-ssm-param]  
[Introduction to JSON Web Tokens][auth0-jwt-intro]  
[JSON Web Token (JWT) - The right way of implementing, with Node.js][jwt-right-way]  
[RSA Key Generator](http://travistidwell.com/jsencrypt/demo/ "RSA Key Generator | Travis Tidwell")  

[sls-authn]: https://serverless.com/blog/strategies-implementing-user-authentication-serverless-applications/ "AuthN Strategies | Serverless Blog"
[aws-ssm-param]: https://serverless.com/framework/docs/providers/aws/guide/variables#reference-variables-using-the-ssm-parameter-store "Reference Variables using the SSM Parameter Store | Serverless Docs"
[jwt-right-way]: https://medium.com/@siddharthac6/json-web-token-jwt-the-right-way-of-implementing-with-node-js-65b8915d550e "JSON Web Tokens with Node.js | Medium"
[auth0-jwt-intro]: https://jwt.io/introduction/ "Introduction to JSON Web Tokens | JWT.io"