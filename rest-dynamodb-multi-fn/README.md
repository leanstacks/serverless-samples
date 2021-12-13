# Serverless Samples: rest-dynamodb-multi-fn

This sample serverless application builds upon the basic [rest-dynamodb](../rest-dynamodb) sample. It is a basic example of how to implement REST services for a simple *User* resource using NodeJS leveraging the Express framework. Data for the *User* resource is persisted in DynamoDB.

Rather than deploying a single API endpoint with a single Lambda function like the [rest-dynamodb](../rest-dynamodb) sample, this project configures individual endpoints for each API endpoint:
- GET /user/:userId
- GET /user
- POST /user
- PUT /user/:userId
- DELETE /user/:userId

Using the Express framework to process events from the API Gateway allows you to handle requests for multiple API endpoints within a single Lambda function (i.e. handler). The Express router interrogates the event object supplied to the Lambda function handler by the API Gateway and invokes the matching Express handler function.

Let's assume there are the five traditional CRUD API endpoints for the User resource. What are the operational implications to exposing those five endpoints as a single Lambda function versus five dedicated Lambda functions?

When all five endpoints are handled by a single Lambda function, managed by Express, it can limit the impact of cold starts for infrequently used resources. However, when the traffic for multiple endpoints is routed to a single Lambda function, the granularity of operational metrics is lost. 

When each endpoint is backed by a dedicated Lambda function, AWS provides discrete metrics for the number of invocations, the number of errors, and the invocation time. If greater operational control is required at the API endpoint-level, perhaps dedicated Lambda functions per endpoint is a better approach.

To the API client (consumer) each approach is the same; however, each option has different operational characteristics for the API provider.

This sample application illustrates how to use a single, shared code base, but deploy a dedicated Lambda function for each API Gateway endpoint.


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

The command output will print the base URL for the AWS API Gateway created by the Serverless template. It will look something like:  
`https://5wnbzbk94k.execute-api.us-east-1.amazonaws.com/dev`

## Remove from AWS

Run the following command in the sample base directory to clean up and remove all AWS resources deployed by this sample:

```
sls remove

or

sls remove --aws-profile [profileName]
```

## Run

We recommend that you use an API client such as [Postman][postman] to exercise this sample.

However, you may use the `curl` commands illustrated below if you are not familiar with Postman.

### curl command options

The following options are used with the `curl` commands illustrated below.

`-v` --- write verbose output  
`-d` --- request body data  
`-H` --- request header  
`-X` --- request HTTP method  

### Create User

To create a user, execute the following command from a terminal prompt.

```
curl [-v] -d '{"userId":"jsmith","name":"John Smith"}' -H 'Content-Type: application/json' [baseUrl]/users

e.g.

curl -v -d '{"userId":"jsmith","name":"John Smith"}' -H 'Content-Type: application/json' https://5wnbzbk94k.execute-api.us-east-1.amazonaws.com/dev/users
```

### List Users

To fetch a list of all users, execute the following command from a terminal prompt.

```
curl [-v] [baseURL]/users

e.g.

curl -v https://5wnbzbk94k.execute-api.us-east-1.amazonaws.com/dev/users
```

### Get User (by ID)

To fetch a single user by identifier, execute the following command from a terminal prompt.

```
curl [-v] [baseURL]/users/[userId]

e.g.

curl -v https://5wnbzbk94k.execute-api.us-east-1.amazonaws.com/dev/users/jsmith
```

### Update User

To update a user, execute the following command from a terminal prompt.

```
curl [-v] -d '{"userId":"jsmith","name":"James Smith"}' -H 'Content-Type: application/json' -X PUT [baseUrl]/users/[userId]

e.g.

curl -v -d '{"userId":"jsmith","name":"James Smith"}' -H 'Content-Type: application/json' -X PUT https://5wnbzbk94k.execute-api.us-east-1.amazonaws.com/dev/users/jsmith
```

### Delete User

To delete a user, execute the following command from a terminal prompt.

```
curl [-v] -X DELETE [baseUrl]/users/[userId]

e.g.

curl -v -X DELETE https://5wnbzbk94k.execute-api.us-east-1.amazonaws.com/dev/users/jsmith
```

[nvm]: https://github.com/nvm-sh/nvm "Node Version Manager"
[yarn]: https://yarnpkg.com/ "Yarn Package Manager"
[sls]: https://www.serverless.com/ "Serverless Framework"
[postman]: https://www.postman.com/ "Postman API platform"