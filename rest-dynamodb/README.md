# Serverless Samples: rest-dynamodb

This sample serverless application is a basic example of how to implement REST services for a simple *User* resource using NodeJS leveraging the Express framework. Data for the *User* resource is persisted in DynamoDB.

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