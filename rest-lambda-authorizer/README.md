# Sample: REST Services with Lambda Authorizer

This sample serverless application is a basic example of how to implement a Lambda Authorizer, formerly called a *Custom Authorizer*, for a REST API.

This sample application is the introductory example for using Lambda Authorizers. This project contains other Lambda Authorizer sample applications which build upon this one.

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

To test the deployed application, you may use cURL, or better yet, a REST client such as Postman. Create a request for the `/hello` endpoint and include the `Authorization` header. See the various outcomes of a Lambda Authorizer by passing the following values in the `Authorization` header:
- allow
- deny
- unauthorized
- blah (or any other value)

### Remove the Application

To remove the serverless application from AWS, navigate to the application base directory and issue the following command:

```
sls remove
```

## See Also

[Strategies for implementing user authentication in serverless applications][sls-authn]  
[Configure HTTP Endpoints with Custom Authorizers](https://serverless.com/framework/docs/providers/aws/events/apigateway#http-endpoints-with-custom-authorizers "API Gateway Events with Lambda Authorizers | Serverless Docs")  
[Use API Gateway Lambda Authorizers](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html "Use API Gateway Lambda Authorizers | AWS Docs")  

[sls-authn]: https://serverless.com/blog/strategies-implementing-user-authentication-serverless-applications/ "AuthN Strategies | Serverless Blog"