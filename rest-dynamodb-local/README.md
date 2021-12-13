# Serverless Samples: rest-dynamodb-local

This sample serverless application builds upon the [rest-dynamodb-multi-fn](../rest-dynamodb-multi-fn) sample. It is a basic example of how to implement REST services for a simple *User* resource using NodeJS leveraging the Express framework. Data for the *User* resource is persisted in DynamoDB.

This sample application employs the [`serverless-offline`](https://www.npmjs.com/package/serverless-offline) and [`serverless-dynamodb-local`](https://www.npmjs.com/package/serverless-dynamodb-local) libraries to facilitate rapid local machine development and testing, alleviating the need for frequent AWS deployments during the development process.

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

## Initialize Local DynamoDB

Initialize the local DynamoDB database. Run the following command in the sample base directory:

```
sls dynamodb install
```

DynamnoDB is configured to run on port 8000.

**Note:** To remove the local DynamoDB, run the following command in the sample base directory:

```
sls dynamodb remove
```

## Start the Application

Run the following command in the sample base directory:

```
sls offline start

or, to use a non-default AWS profile...

[AWS_PROFILE=profileName] sls offline start
```

Despite the process running locally, a valid AWS profile is required. If you wish to use an AWS profile other than *default*, prefix the command with the `AWS_PROFILE` environment variable.

The application listens for requests on port 3000. Therefore, the base URL for requests is:  
  
`http://localhost:3000/dev`  
  
For example, to send a request to the *get users* endpoint, you would use the URL:  

`http://localhost:3000/dev/users`

**Note:** To stop the offline mode process, press `ctrl-C` on your keyboard.

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

curl -v -d '{"userId":"jsmith","name":"John Smith"}' -H 'Content-Type: application/json' http://localhost:3000/dev/users
```

### List Users

To fetch a list of all users, execute the following command from a terminal prompt.

```
curl [-v] [baseURL]/users

e.g.

curl -v http://localhost:3000/dev/users
```

### Get User (by ID)

To fetch a single user by identifier, execute the following command from a terminal prompt.

```
curl [-v] [baseURL]/users/[userId]

e.g.

curl -v http://localhost:3000/dev/users/jsmith
```

### Update User

To update a user, execute the following command from a terminal prompt.

```
curl [-v] -d '{"userId":"jsmith","name":"James Smith"}' -H 'Content-Type: application/json' -X PUT [baseUrl]/users/[userId]

e.g.

curl -v -d '{"userId":"jsmith","name":"James Smith"}' -H 'Content-Type: application/json' -X PUT http://localhost:3000/dev/users/jsmith
```

### Delete User

To delete a user, execute the following command from a terminal prompt.

```
curl [-v] -X DELETE [baseUrl]/users/[userId]

e.g.

curl -v -X DELETE http://localhost:3000/dev/users/jsmith
```

[nvm]: https://github.com/nvm-sh/nvm "Node Version Manager"
[yarn]: https://yarnpkg.com/ "Yarn Package Manager"
[sls]: https://www.serverless.com/ "Serverless Framework"
[postman]: https://www.postman.com/ "Postman API platform"