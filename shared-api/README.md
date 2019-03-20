# Sample: REST Services with Shared API

This sample serverless application is an example of how to implement a [shared API Gateway REST API][sls-sharedapi].

This sample has two sub-directories. The `api` directory contains a serverless specification which provisions the API Gateway REST API. The `service-messages` directory contains a serverless specification which provisions the functions and API resources for a *messages* resource. For this simple example, these are nested sub-directories; however, they could easily reside in dedicated SCM repositories. This approach allows individual services to have their own lifecycle and be maintained by separate teams.

Normally, each serverless specification provisions a dedicated API Gateway REST API when deployed. However, by using the outputs from the `api` project in the `service-messages` serverless specification, the messages API endpoints are created within the API provisioned in the `api` project.

## How to Use

First for the `api` project and then, second, for the `service-messages` project, follow the steps below. It is important that you *deploy* the `api` project first because the `service-messages` deploys its assets within the same API.

Likewise, when cleaning up AWS, order matters. It is important to *remove* the `api` project last.

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

To test the deployed application, you may use cURL, or better yet, a REST client such as Postman. Create a request for the `/info` endpoint to test the endpoint deployed by the `api` project. Create a request for `/messages/hello`, `/messages/goodbye`, or `/messages` endpoints to test the endpoints deployed by the `service-messages` project.

Note that the base URL for the endpoints deployed by both projects is the same. This is because both projects are sharing the same API Gateway REST API.

### Remove the Application

To remove the serverless application from AWS, navigate to the application base directory and issue the following command:

```
sls remove
```

## See Also

[Share API Gateway and API Resources][sls-sharedapi]  
[Reference CloudFormation Outputs](https://serverless.com/framework/docs/providers/aws/guide/variables#reference-cloudformation-outputs "Reference CloudFormation Outputs | Serverless Docs")  

[sls-sharedapi]: https://serverless.com/framework/docs/providers/aws/events/apigateway#share-api-gateway-and-api-resources "Share API Gateway and API Resources | Serverless Docs"  