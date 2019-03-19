# Sample: REST Services with Multiple Functions

This sample serverless application builds upon the basic [rest-dynamodb] sample. It is a basic example of how to implement REST services for a simple *User* resource using NodeJS leveraging the Express framework. Data for the *User* resource is persisted in DynamoDB.

Rather than deploying a single API endpoint with a single Lambda function like the [rest-dynamodb] sample, this project configures individual endpoints for each API endpoint:
- GET /user/:userId
- GET /user
- POST /user
- PUT /user/:userId
- DELETE /user/:userId

Using the Express framework to process events from the API Gateway allows you to handle requests for multiple API endpoints within a single Lambda function (i.e. handler). The Express router interrogates the event object supplied to the Lambda function handler by the API Gateway and invokes the matching Express handler function.

Let's assume there are the five traditional CRUD API endpoints for the User resource. What are the operational implications to exposing those five endpoints as a single Lambda function versus five dedicated Lambda functions?

If all five endpoints are handled by a single Lambda function, managed by Express, it can limit the impact of cold starts for infrequently used resources.

However, when the traffic for multiple endpoints is routed to a single Lambda function, the granularity of operational metrics is lost. If each endpoint is backed by a dedicated Lambda function, AWS provides discrete metrics for the number of invocations, the number of errors, and the invocation time.

This sample application illustrates how to use a single, shared code base, but deploy a dedicated Lambda function for each API Gateway endpoint.

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

To test the deployed application, you may use cURL, or better yet, a REST client such as Postman. Create a User in DynamoDB by POSTing to the API endpoint. Then fetch the user by GETting it from the API endpoint, passing the userId as a URL path parameter.

### Remove the Application

To remove the serverless application from AWS, navigate to the applicationb ase directory and issue the following command:

```
sls remove
```

## See Also

[Deploy a REST API using Serverless, Express and Node.js](https://serverless.com/blog/serverless-express-rest-api/)

[rest-dynamodb]: ../rest-dynamodb "Basic REST with DynamoDB | Serverless Samples"