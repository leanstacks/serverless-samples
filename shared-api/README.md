# Serverless Samples: shared-api

This sample serverless application is an example of how to implement a [shared API Gateway REST API][sls-sharedapi].

This sample has two sub-directories each representing an application component. The `api` directory contains a serverless specification which provisions the API Gateway REST API. The `service-messages` directory contains a serverless specification which provisions the functions and API resources for a *messages* resource. For this simple example, these are nested sub-directories; however, they could easily reside in dedicated SCM repositories. This approach allows individual services to have their own lifecycle and be maintained by separate teams.

Normally, each serverless specification provisions a dedicated API Gateway REST API when deployed. However, by using the outputs from the `api` project in the `service-messages` serverless specification, the messages API endpoints are created within the API provisioned in the `api` project.

## Prerequisites

The following are required to deploy and run this sample.

* [NVM with Node 14.x (lts/fermium)][nvm]
* [Yarn][yarn]
* [Serverless Framework][sls]

Configure the Serverless framework with [AWS credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/).

## Install

First for the `api` project and then, second, for the `service-messages` project, follow the steps below. It is important that you *deploy* the `api` component first because the `service-messages` component depends upon the API Gateway provisioned by the `api` component.

Likewise, when cleaning up AWS resources, order matters. It is important to *remove* the `api` project last.

Run the following command in each of the component base directories:

```
nvm use

yarn install
```

## Deploy to AWS

### Deploy the API Component

Run the following command first in the `api` directory:

```
sls deploy

or

sls deploy --aws-profile [profileName]
```

The command output will look similar to:

```
Serverless: Stack update finished...
Service Information
service: samples-shared-api-base
stage: dev
region: us-east-1
stack: samples-shared-api-base-dev
resources: 11
api keys:
  None
endpoints:
  GET - https://7nqvtr7m0m.execute-api.us-east-1.amazonaws.com/dev/info
functions:
  info: samples-shared-api-base-dev-info
layers:
  None
```

### Deploy the Message Service Component

Run the following command second in the `service-messages` directory:

```
sls deploy

or

sls deploy --aws-profile [profileName]
```

The command output will look similar to:

```
Serverless: Stack update finished...
Service Information
service: samples-shared-api-messages
stage: dev
region: us-east-1
stack: samples-shared-api-messages-dev
resources: 16
api keys:
  None
endpoints:
  GET - https://7nqvtr7m0m.execute-api.us-east-1.amazonaws.com/dev/messages
  GET - https://7nqvtr7m0m.execute-api.us-east-1.amazonaws.com/dev/messages/{proxy+}
functions:
  listMessages: samples-shared-api-messages-dev-listMessages
  getMessage: samples-shared-api-messages-dev-getMessage
layers:
  None
```

Notice that the base URL of the service endpoints from both the `api` and the `service-messages` components is the same, meaning that the `service-messages` component is sharing the API provisioned by the `api` component.

## Remove from AWS

### Remove the Message Service Component

Run the following command first in the `service-messages` directory:

```
sls remove

or

sls remove --aws-profile [profileName]
```

### Remove the API Component

Run the following command second in the `api` directory:

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

### Get Info

To invoke the `GET /info` API, execute the following command from a terminal prompt.

```
curl [-v] https://[baseUrl]/info

e.g.

curl -v https://7nqvtr7m0m.execute-api.us-east-1.amazonaws.com/dev/info
```

### List Messages

To invoke the `GET /messages` API, execute the following command from a terminal prompt.

```
curl [-v] https://[baseUrl]/messages

e.g.

curl -v https://7nqvtr7m0m.execute-api.us-east-1.amazonaws.com/dev/messages
```

### Find Message

To invoke the `GET /messages/:messageId` API, execute the following command from a terminal prompt.

**Note:** Try message IDs: `hello` or `goodbye` or `blah`.

```
curl [-v] https://[baseUrl]/messages/:messageId

e.g.

curl -v https://7nqvtr7m0m.execute-api.us-east-1.amazonaws.com/dev/messages/hello
```

## See Also

[Share API Gateway and API Resources][sls-sharedapi]  
[Reference CloudFormation Outputs](https://serverless.com/framework/docs/providers/aws/guide/variables#reference-cloudformation-outputs "Reference CloudFormation Outputs | Serverless Docs")  

[sls-sharedapi]: https://serverless.com/framework/docs/providers/aws/events/apigateway#share-api-gateway-and-api-resources "Share API Gateway and API Resources | Serverless Docs"  

[nvm]: https://github.com/nvm-sh/nvm "Node Version Manager"
[yarn]: https://yarnpkg.com/ "Yarn Package Manager"
[sls]: https://www.serverless.com/ "Serverless Framework"
[postman]: https://www.postman.com/ "Postman API platform"