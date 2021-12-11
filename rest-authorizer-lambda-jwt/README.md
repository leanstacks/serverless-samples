# Serverless Samples: rest-authorizer-lambda-jwt

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

## Prerequisites

The following are required to deploy and run this sample.

* [NVM with Node 14.x (lts/fermium)][nvm]
* [Yarn][yarn]
* [Serverless Framework][sls]

Configure the Serverless framework with [AWS credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/).

## Install

Run the following command in the sample base directory:

```
nvm use

yarn install
```

## Deploy to AWS

Run the following command in the sample base directory:

```
sls deploy

or

sls deploy --aws-profile [profileName]
```

The command output will print the base URL for the AWS API Gateway endpoints created by the Serverless template. It will look something like:  

```
Serverless: Stack update finished...
Service Information
service: samples-lambda-authorizer-jwt
stage: dev
region: us-east-1
stack: samples-lambda-authorizer-jwt-dev
resources: 29
api keys:
  None
endpoints:
  GET - https://mycmu3dn2i.execute-api.us-east-1.amazonaws.com/dev/messages/{proxy+}
  GET - https://mycmu3dn2i.execute-api.us-east-1.amazonaws.com/dev/messages
  POST - https://mycmu3dn2i.execute-api.us-east-1.amazonaws.com/dev/auth/request_token
functions:
  getMessage: samples-lambda-authorizer-jwt-dev-getMessage
  listMessages: samples-lambda-authorizer-jwt-dev-listMessages
  requestToken: samples-lambda-authorizer-jwt-dev-requestToken
  tokenAuthorizer: samples-lambda-authorizer-jwt-dev-tokenAuthorizer
layers:
  None
```

Be sure to note the endpoint URLs for use later.

## Remove from AWS

Run the following command in the sample base directory to clean up and remove all AWS resources deployed by this sample:

```
sls remove

or

sls remove --aws-profile [profileName]
```

## Run

We recommend that you use an API client such as [Postman][postman] to exercise this sample. However, you may use the following `cURL` commands at a terminal prompt.

### Obtain a Token

First obtain an access token. The API key value does not matter.

```
curl [-v] -H 'X-Auth-Key:abc123' -X POST [baseUrl]/auth/request_token

example...

curl -v -H 'X-Auth-Key:abc123' -X POST https://mycmu3dn2i.execute-api.us-east-1.amazonaws.com/dev/auth/request_token
```

### List Messages 

Retrieve the access token from the response body and invoke any of the secured *messages* endpoints. For example, to list all messages send a request like the one below.

```
curl [-v] -H 'X-Auth-Token:[token]' [baseUrl]/messages

example...

curl -v -H 'X-Auth-Token:eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJh' https://mycmu3dn2i.execute-api.us-east-1.amazonaws.com/dev/messages
```

Try omitting the `X-Auth-Token` header and see what happens.

### Find a Message

To find a message by the message identifier, issue a curl command like the one below.

```
curl [-v] -H 'X-Auth-Token:[token]' [baseUrl]/messages/:id

example...

curl -v -H 'X-Auth-Token:eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJh' https://mycmu3dn2i.execute-api.us-east-1.amazonaws.com/dev/messages/hello
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
[nvm]: https://github.com/nvm-sh/nvm "Node Version Manager"
[yarn]: https://yarnpkg.com/ "Yarn Package Manager"
[sls]: https://www.serverless.com/ "Serverless Framework"
[postman]: https://www.postman.com/ "Postman API platform"