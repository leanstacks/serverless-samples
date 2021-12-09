# Serverless Samples: rest-dynamodb-modular

This sample serverless application builds upon the basic [rest-dynamodb-multi-fn](../rest-dynamodb-multi-fn) sample. 

This sample serverless application illustrates how to implement REST services with a more modular code structure. Many of the samples in this project illustrate a particular Serverless concept and all of the logic is contained within a single source file. While this serves to illustrate the concept of the example, it is not meant to illustrate best practices when authoring Serverless applications.

This sample seeks to illustrate the following:
- separate the concerns of: data persistence, business logic, and function handler (i.e. request/response) [SRP](https://en.wikipedia.org/wiki/Single-responsibility_principle)
- separate business logic into logical units by function (or purpose) [SRP](https://en.wikipedia.org/wiki/Single-responsibility_principle)
- increase function/module reusability within the domain of this component [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
- increase the [testability][sls-testing] of code

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
curl [-v] -d '{"userId":"jsmith","name":"James Smith"}' -H 'Content-Type: application/json' -X DELETE [baseUrl]/users/[userId]

e.g.

curl -v -d '{"userId":"jsmith","name":"James Smith"}' -H 'Content-Type: application/json' -X DELETE https://5wnbzbk94k.execute-api.us-east-1.amazonaws.com/dev/users/jsmith
```

### Test the Application

To run the unit tests, navigate to the application base directory and issue the following command: 

```
yarn test
```

Jest prints the test results to the console. An example follows.

```
yarn run v1.22.17
$ jest
 PASS  src/tests/params/database/user.test.js
 PASS  src/tests/service/user-service.test.js

Test Suites: 2 passed, 2 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        0.244 s, estimated 1 s
Ran all test suites.
Done in 0.92s.
```

### Produce JSDoc

To produce the JSDoc pages, navigate to the application base directory and issue the following command:

```
yarn jsdoc
```

**Note:** The documentation is written to the `/docs` directory.  Open the `/docs/index.html` file in your browser to view it.

## See Also
[Serverless Framework Testing][sls-testing]  
[Unit testing for Node.js Serverless projects with Jest](https://serverless.com/blog/unit-testing-nodejs-serverless-jest/)  

[sls-testing]: https://serverless.com/framework/docs/providers/aws/guide/testing/ "Testing | Serverless Docs"

[nvm]: https://github.com/nvm-sh/nvm "Node Version Manager"
[yarn]: https://yarnpkg.com/ "Yarn Package Manager"
[sls]: https://www.serverless.com/ "Serverless Framework"
[postman]: https://www.postman.com/ "Postman API platform"
