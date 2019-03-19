# Sample: REST Services with Modular Code Structure

This sample serverless application illustrates how to implement REST services with a more modular code structure. Many of the samples in this project illustrate a particular Serverless concept and all of the logic is contained within the function handler method. While this serves to illustrate the concept of the example, it is not meant to illustrate best practices when authoring Serverless applications.

This sample seeks to illustrate the following:
- separate business logic from the function handler
- separate business logic into logical units by function (or purpose)
- increase the [testability][sls-testing] of code by isolating external dependencies, making them easily mockable

## How to Use

### Install Dependencies

Install the project dependencies with the Yarn package manager. Navigate to the application base directory and issue the following command:

```
yarn install
```

### Run the Application

Run the serverless application. Navigate to the application base directory and issue the following command:

```
# Deploy to 'dev' stage by default
sls deploy

OR

# Deploy to a specific stage
sls deploy --stage prod
```

The console output displays the progress as the application is deployed to AWS. 

```
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
(omitted lines)
.....
Service Information
service: samples-rest-dynamodb-modular
stage: dev
region: us-east-1
stack: samples-rest-dynamodb-modular-dev
resources: 32
api keys:
  None
endpoints:
  GET - https://m3waljj607.execute-api.us-east-1.amazonaws.com/dev/users/{proxy+}
  GET - https://m3waljj607.execute-api.us-east-1.amazonaws.com/dev/users
  POST - https://m3waljj607.execute-api.us-east-1.amazonaws.com/dev/users
  PUT - https://m3waljj607.execute-api.us-east-1.amazonaws.com/dev/users/{proxy+}
  DELETE - https://m3waljj607.execute-api.us-east-1.amazonaws.com/dev/users/{proxy+}
functions:
  getUser: samples-rest-dynamodb-modular-dev-getUser
  getUsers: samples-rest-dynamodb-modular-dev-getUsers
  createUser: samples-rest-dynamodb-modular-dev-createUser
  updateUser: samples-rest-dynamodb-modular-dev-updateUser
  deleteUser: samples-rest-dynamodb-modular-dev-deleteUser
layers:
  None
```

Using the base URL for the `GET` API in the Console output test the functions.  For example, to invoke the *Get User* endpoint, issue the following after substituting your base URL:

```
curl https://m3waljj607.execute-api.us-east-1.amazonaws.com/dev/users/1234567890
```

To remove the application from AWS, use the `remove` command:

```
# Remove from 'dev' stage by default
sls remove

OR

# Remove from a specific stage
sls remove --stage prod
```

### Test the Application

To run the unit tests, navigate to the application base directory and issue the following command: 

```
yarn test
```

Jest prints the test results to the console. An example follows.

```
yarn run v1.13.0
$ jest
  PASS  tests/model/user.test.js
  PASS  tests/params/user.test.js

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        0.755s, estimated 1s
Ran all test suites.
Done in 1.30s.
```

## See Also
[Serverless Framework Testing][sls-testing]  
[Unit testing for Node.js Serverless projects with Jest](https://serverless.com/blog/unit-testing-nodejs-serverless-jest/)  

[sls-testing]: https://serverless.com/framework/docs/providers/aws/guide/testing/ "Testing | Serverless Docs"