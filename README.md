# Serverless Samples

Samples and snippets of application components constructed using the Serverless Framework and Amazon Web Services (AWS). 

All samples are authored in JavaScript for the Node.js AWS Lambda runtime.

## Acknowledgements

This is a [LEAN**STACKS**](https://leanstacks.com/) solution.

## What's Inside

Each sub-directory contains a sample project illustrating a specific serverless feature or group of features. Some samples build upon concepts from other samples. 

If you are new to serverless software engineering or simply looking for a table of contents, the list below is a general guideline for exploring the samples in this repository in a meaningful order.

### rest-hello

A "Hello World" REST API demonstrating how to handle events from the API Gateway in AWS Lambda using Express and the Serverless HTTP plugin.

### rest-dynamodb

This sample serverless application is a basic example of how to implement REST services using Express. Data for the REST resource is persisted in DynamoDB.

This sample application is the introductory example for using DynamoDB. This project contains other DynamoDB samples which build upon this one.

### rest-dynamodb-ondemand

This sample serverless application is a basic example of how to implement REST services using Express. Data for the REST resource is persisted in DynamoDB. The DynamoDB table is configured in on-demand capacity mode rather than fixed capacity units.

This sample application builds upon the introductory example for using DynamoDB.

### rest-dynamodb-multi-fn

This sample serverless application builds upon the basic REST API sample. It is a simple example of how to implement CRUD (Create, Read, Update, and Delete) REST services for a REST resource using NodeJS leveraging the Express framework. Data for the REST resource is persisted in DynamoDB.

Rather than deploying a single API endpoint with a single Lambda function, this project configures individual endpoints for each API endpoint.

### rest-dynamodb-local

This sample serverless application illustrates how to implement REST services for a single resource using NodeJS leveraging the Express framework. Data for the REST resource is persisted in DynamoDB.

This sample application employs the `serverless-offline` and `serverless-dynamodb-local` libraries to facilitate rapid local machine development and testing, alleviating the need for frequent AWS deployments during the development process.

### rest-dynamodb-modular

This sample serverless application illustrates how to implement REST services with a more modular code structure. Many of the samples in this project illustrate a particular Serverless concept and all of the logic is contained within the function handler method. While this serves to illustrate the concept of the example, it is not meant to illustrate best practices when authoring Serverless applications.

### custom-domain

This sample demonstrates how to provision custom domain names in Amazon API Gateway using the Serverless Domain Manager plugin.

### custom-domain-multi-svc

This sample illustrates how to implement multiple REST services for different resources. Each service is developed and managed independently; however, they share a custom domain. 

### test-jest

This sample demonstrates how to configure, author, and execute unit tests for a serverless application component using the Jest testing framework.

### rest-environment

This sample serverless application illustrates how to implement REST services whose functions are passed environment variables.

### rest-environment-ssm

This sample builds upon the `rest-environment` sample by sourcing the environment variables from AWS Systems Manager Parameter Store, a.k.a. SSM.

### rest-authorizer-lambda

This sample serverless application is a basic example of how to implement a Lambda Authorizer, formerly called a *Custom Authorizer*, for a REST API.

This sample application is the introductory example for using Lambda Authorizers. This project contains other Lambda Authorizer sample applications which build upon this one.

### rest-lambda-authorizer-jwt

This sample serverless application is an example of how to implement a Lambda Authorizer, formerly called a *Custom Authorizer*, with JSON Web Tokens (JWT) for a REST API.

### rest-authorizer-cognito

This sample serverless application is a basic example of how to implement a Cognito Authorizer which authenticates requests to a REST API with a Cognito User Pool.

### shared-api

This sample serverless application is an example of how to implement a shared API Gateway REST API.

Normally, each serverless specification provisions a dedicated API Gateway REST API when deployed. However, by using outputs from an `api` componnet in another `service` serverless specification, the service REST API endpoints are created within the API Gateway REST API provisioned by the `api` component.

### shared-api-custom-domain

This sample application builds upon the `shared-api` sample adding the use of Amazon API Gateway Custom Domain Names.  Not only do multiple serverless projects share the same API Gateway, but that API Gateway is accessible by a custom domain name.

### step-functions

This sample serverless application illustrates how to implement a simple Step Functions State Machine using Serverless Framework plugins. This project creates a simple state machine which is invoked via an API Gateway event.

### step-functions-api-sync

This sample serverless application illustrates how to implement a simple Step Functions State Machine using Serverless Framework plugins and poll for the result of the state machine execution. 

Step functions state machine executions are asynchronous. This sample project demonstrates how to invoke a step function state machine programmatically and how to poll the execution history events to determine when execution has completed and extract the resulting output.

While it is not typical to invoke a Step Functions State Machine *synchronously*, this sample illustrates several useful AWS SDK calls for assessing the status of a State Machine invocation.

## See Also

[LEANSTACKS][leanstacks]  
[LEANSTACKS Serverless Samples][ls-serverless]  
[Serverless Framework][sls]  
[Serverless Blog][sls-blog]  
[Serverless Docs for AWS][sls-aws]  

[leanstacks]: https://leanstacks.com/ "LEANSTACKS"
[ls-serverless]: https://leanstacks.com/stacks.html#serverless-samples "Serverless Samples | LEANSTACKS"
[sls]: https://serverless.com/ "Serverless Framework"
[sls-blog]: https://serverless.com/blog/ "Blog | Serverless Framework"
[sls-aws]: https://serverless.com/framework/docs/providers/aws/ "AWS Documentation | Serverless Framework"