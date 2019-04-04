# Sample: Step Functions - Execute and Poll

This sample serverless application illustrates how to implement a simple Step Functions State Machine using Serverless Framework plugins and poll for the result of the state machine execution. 

Step functions state machine executions are asynchronous. This sample project demonstrates how to invoke a step function state machine programmatically and how to poll the execution history events to determine when execution has completed and extract the resulting output.

## How to Use

### Install Dependencies

Install the project dependencies with the Yarn package manager. Navigate to the application base directory and issue the following command:

```
yarn install
```

### Run the Application

Run the serverless application on AWS. Navigate to the application base directory and issue the following command:

```
sls deploy
```

The Serverless Framework packages the application and deploys it to AWS. The application creates an API Gateway API, Lambda Functions, and a Step Functions State Machine. The State Machine is invoked by the `createMessage` Lambda function.

To test the deployed application, you may use cURL, or better yet, a REST client such as Postman.

Send a POST request to the `/messages` endpoint. You may leave the request body empty or include JSON in the following format:

```
{
  "audience": "Step Functions"
}
```

An invocation of a Step Function State Machine is asynchronous. Therefore, when the `createMessage` Lambda function invokes the State machine, it returns immediately. The response body contains an ARN referencing the specific execution of the State Machine. The Lambda function contains logic to poll for the outcome of the State Machine execution. A sample response format is:

```
{
    "message": "HELLO STEP FUNCTIONS!",
    "createdAt": 1554380384990
}
```

When the final state of the execution is detected, the ouput retrieved from the State Machine execution and returned to the caller via the API Gateway.

### Remove the Application

To remove the serverless application from AWS, navigate to the application base directory and issue the following command:

```
sls remove
```

## See Also
[How to manage your AWS Step Functions with Serverless][sls-stepfunctions]  
[serverless-step-functions](https://www.npmjs.com/package/serverless-step-functions "serverless-step-functions | NPM")  
[serverless-pseudo-parameters](https://www.npmjs.com/package/serverless-pseudo-parameters "serverless-pseudo-parameters | NPM")  

[sls-stepfunctions]: https://serverless.com/blog/how-to-manage-your-aws-step-functions-with-serverless/ "How to manage your AWS Step Functions with Serverless | Serverless Blog"
[aws-stepf-gateway]: https://docs.aws.amazon.com/step-functions/latest/dg/tutorial-api-gateway.html "Creating a Step Functions API Using API Gateway | AWS Docs"
