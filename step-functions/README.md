# Serverless Samples: step-functions

This sample serverless application illustrates how to implement a simple Step Functions State Machine using Serverless Framework plugins. This project creates a simple state machine which is [invoked via an API Gateway][aws-stepf-gateway]. Other samples build upon this example.

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

The command output will look something like this:

```
Service Information
service: samples-step-functions
stage: dev
region: us-east-1
stack: samples-step-functions-dev
resources: 16
api keys:
  None
endpoints:
functions:
  createMessage: samples-step-functions-dev-createMessage
  toUppercase: samples-step-functions-dev-toUppercase
layers:
  None
Serverless StepFunctions OutPuts
endpoints:
  POST - https://kiutxq2s3e.execute-api.us-east-1.amazonaws.com/dev/messages
```

Note the Step Function endpoint URLs for use later.

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

### Initiate the Step Function

The step function state machine is triggered by sending a request to the `/messages` HTTP endpoint.

To start the step function, execute the following command from a terminal prompt.

```
curl [-v] -X POST [baseUrl]/messages

e.g.

curl -v -X POST https://5wnbzbk94k.execute-api.us-east-1.amazonaws.com/dev/messages
```

The command above does not pass any initial input to the step function so it runs with a default initial value. To supply an initial input, execute the following command from a terminal prompt.

```
curl [-v] -d '{"audience":"Step Functions"}' -H 'Content-Type: application/json' -X POST [baseUrl]/messages

e.g.

curl -v -d '{"audience":"Step Functions"}' -H 'Content-Type: application/json' -X POST https://5wnbzbk94k.execute-api.us-east-1.amazonaws.com/dev/messages
```

An invocation of a Step Function State Machine is asynchronous. Therefore, it returns immediately. The response body contains an ARN referencing the specific execution of the State Machine. The AWS SDK may be used to poll for the outcome of the State Machine execution. A sample response is:

```
{
  "executionArn": "arn:aws:states:us-east-1:123456789012:execution:samples-step-functions-dev-createMessage:b4c3b21c-508f-11e9-8069-878f965c5349",
  "startDate": 1553691375.579
}
```

To view the result of a State Machine execution, log into the AWS Console and navigate to the Step Functions service and [State Machines](https://console.aws.amazon.com/states/home#/statemachines) page. Select the execution you wish to view and expand the Input, Output, and Exceptions to view each. You may also select a specific state, such as `CreateMessage` or `ToUppercase` and view the Input and Ouput from that specific step in the execution.

## See Also
[How to manage your AWS Step Functions with Serverless][sls-stepfunctions]  
[serverless-step-functions](https://www.npmjs.com/package/serverless-step-functions "serverless-step-functions | NPM")  
[serverless-pseudo-parameters](https://www.npmjs.com/package/serverless-pseudo-parameters "serverless-pseudo-parameters | NPM")  

[sls-stepfunctions]: https://serverless.com/blog/how-to-manage-your-aws-step-functions-with-serverless/ "How to manage your AWS Step Functions with Serverless | Serverless Blog"
[aws-stepf-gateway]: https://docs.aws.amazon.com/step-functions/latest/dg/tutorial-api-gateway.html "Creating a Step Functions API Using API Gateway | AWS Docs"

[nvm]: https://github.com/nvm-sh/nvm "Node Version Manager"
[yarn]: https://yarnpkg.com/ "Yarn Package Manager"
[sls]: https://www.serverless.com/ "Serverless Framework"
[postman]: https://www.postman.com/ "Postman API platform"