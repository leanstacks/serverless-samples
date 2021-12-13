# Serverless Samples: step-functions-api-sync

This sample serverless application illustrates how to implement a simple Step Functions State Machine using Serverless Framework plugins and poll for the result of the state machine execution. 

Step functions state machine executions are asynchronous. This sample project demonstrates how to invoke a step function state machine programmatically and how to poll the execution history events to determine when execution has completed and extract the resulting output.

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
service: samples-stepf-api-sync
stage: dev
region: us-east-1
stack: samples-stepf-api-sync-dev
resources: 19
api keys:
  None
endpoints:
  POST - https://wb4zhq5tva.execute-api.us-east-1.amazonaws.com/dev/messages
functions:
  createMessage: samples-stepf-api-sync-dev-createMessage
  formatMessage: samples-stepf-api-sync-dev-formatMessage
  toUppercase: samples-stepf-api-sync-dev-toUppercase
layers:
  None
```

Note the API Gateway endpoint URLs for use later.

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

The step function state machine is triggered by sending a request to the `/messages` REST API endpoint.

To start the step function, execute the following command from a terminal prompt.

```
curl [-v] -d '{"audience":"Step Functions"}' -H 'Content-Type: application/json' -X POST [endpointUrl]

e.g.

curl -v -d '{"audience":"Step Functions"}' -H 'Content-Type: application/json' -X POST https://5wnbzbk94k.execute-api.us-east-1.amazonaws.com/dev/messages
```

An invocation of a Step Function State Machine is asynchronous. Therefore, it returns immediately. The response body contains an ARN referencing the specific execution of the State Machine. The REST API Lambda function contains logic to poll for the outcome of the State Machine execution. When the function detects that the execution is complete, the execution output is returned as the REST API response. A sample response format is:

```
{
    "message": "HELLO STEP FUNCTIONS!",
    "createdAt": "2021-12-13T13:26:08.896Z"
}
```

You may also view the details of an AWS Step Functions State Machine execution in the AWS console. Log into the AWS Console and navigate to the Step Functions service and [State Machines](https://console.aws.amazon.com/states/home#/statemachines) page. Select the execution you wish to view and expand the Input, Output, and Exceptions to view each.

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