# Sample: Step Functions

This sample serverless application illustrates how to implement a simple Step Functions State Machine using Serverless Framework plugins. This project creates a simple state machine which is [invoked via an API Gateway][aws-stepf-gateway]. Other samples build upon this example.

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

The Serverless Framework packages the application and deploys it to AWS. The application creates an API Gateway API, Lambda Functions, and a Step Functions State Machine. The State Machine is invoked by the API Gateway.

To test the deployed application, you may use cURL, or better yet, a REST client such as Postman.

Send a POST request to the `/messages` endpoint. You may leave the request body empty or include JSON in the following format:

```
{
  "audience": "Step Functions"
}
```

An invocation of a Step Function State Machine is asynchronous. Therefore, when the API Gateway invokes the State machine, it returns immediately. The response body contains an ARN referencing the specific execution of the State Machine. The AWS SDK may be used to poll for the outcome of the State Machine execution. A sample response format is:

```
{
  "executionArn": "arn:aws:states:us-east-1:123456789012:execution:samples-step-functions-dev-createMessage:b4c3b21c-508f-11e9-8069-878f965c5349",
  "startDate": 1553691375.579
}
```

To view the result of a State Machine execution, log into the AWS Console and navigate to the Step Functions service and [State Machines](https://console.aws.amazon.com/states/home#/statemachines) page. Select the execution you wish to view and expand the Input, Output, and Exceptions to view each. You may also select a specific state, such as `CreateMessage` or `ToUppercase` and view the Input, Ouput, and Exception from that specific state in the execution.

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
