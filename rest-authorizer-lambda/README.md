# Serverless Samples: rest-hello

This sample serverless application is a basic example of how to implement a Lambda Authorizer for a REST API.

This sample application is the introductory example for using Lambda Authorizers. This project contains other Lambda Authorizer sample applications which build upon this one.

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

The command output will print the base URL for the AWS API Gateway endpoint created by the Serverless template. It will look something like:  
`https://16edb0j0q8.execute-api.us-east-1.amazonaws.com/dev/hello`

## Remove from AWS

Run the following command in the sample base directory to clean up and remove all AWS resources deployed by this sample:

```
sls remove

or

sls remove --aws-profile [profileName]
```

## Run

We recommend that you use an API client such as [Postman][postman] to exercise this sample.

Create a request for the `/hello` endpoint and include the `Authorization` header. See the various outcomes of a Lambda Authorizer by passing the following values in the `Authorization` header:
- allow
- deny
- unauthorized
- blah (or any other value)

Using `curl`:

```
curl [-v] -H 'Authorization:[allow|deny|unauthorized|blah]' [baseURL]

e.g.

curl -v -H 'Authorization:allow' https://16edb0j0q8.execute-api.us-east-1.amazonaws.com/dev/hello
```

## See Also
[Strategies for implementinguser authentication in serverless applications](https://www.serverless.com/blog/strategies-implementing-user-authentication-serverless-applications/)  
[Configure HTTP Endpoints with Custom Authorizers](https://www.serverless.com/framework/docs/providers/aws/events/apigateway#http-endpoints-with-custom-authorizers)  
[Use API Gateway Lambda authorizers](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html)  

[nvm]: https://github.com/nvm-sh/nvm "Node Version Manager"
[yarn]: https://yarnpkg.com/ "Yarn Package Manager"
[sls]: https://www.serverless.com/ "Serverless Framework"
[postman]: https://www.postman.com/ "Postman API platform"