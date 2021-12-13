# Serverless Samples: test-jest

This sample serverless application builds upon the basic [rest-hello](../rest-hello) sample. 

This sample illustrates how to use [Jest](https://jestjs.io/) to create unit tests for a serverless application.

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

### Get default greeting

To fetch the default greeting, execute the following command from a terminal prompt.

```
curl [-v] [baseURL]/

e.g.

curl -v https://5wnbzbk94k.execute-api.us-east-1.amazonaws.com/dev/
```

### Get custom greeting

To fetch a custom greeting, execute the following command from a terminal prompt.

```
curl [-v] [baseURL]/

e.g.

curl -v https://5wnbzbk94k.execute-api.us-east-1.amazonaws.com/dev/
```

## Test the Application

To run the unit tests, navigate to the application base directory and issue the following command: 

```
yarn test
```

Jest prints the test results to the console. An example follows.

```
yarn run v1.22.17
$ jest
 PASS  __tests__/index.test.js
  ✓ path / should return default greeting (1 ms)
  ✓ path /hello/:name should return bespoke greeting

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.278 s, estimated 1 s
Ran all test suites.
Done in 0.83s.
```

## See Also
[Serverless Framework Testing][sls-testing]  
[Unit testing for Node.js Serverless projects with Jest](https://serverless.com/blog/unit-testing-nodejs-serverless-jest/)  

[sls-testing]: https://serverless.com/framework/docs/providers/aws/guide/testing/ "Testing | Serverless Docs"

[nvm]: https://github.com/nvm-sh/nvm "Node Version Manager"
[yarn]: https://yarnpkg.com/ "Yarn Package Manager"
[sls]: https://www.serverless.com/ "Serverless Framework"
[postman]: https://www.postman.com/ "Postman API platform"
