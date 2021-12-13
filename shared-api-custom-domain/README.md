# Serverless Samples: shared-api-custom-domain

This sample builds upon the [Shared API example](../shared-api). In addition to the ability for multiple Serverless Framework projects to share a single API Gateway REST API, this project demonstrates how to use a custom domain name to access those services.

This sample has two sub-directories each representing an application component. The `api` directory contains a serverless specification which provisions the API Gateway REST API and the Custom Domain Name. The `service-messages` directory contains a serverless specification which provisions the functions and API resources for a *messages* resource. For this simple example, these are nested sub-directories; however, they could easily reside in dedicated SCM repositories. This approach allows individual services to have their own lifecycle and be maintained by separate teams.

Normally, each serverless specification provisions a dedicated API Gateway REST API when deployed. However, by using the outputs from the `api` project in the `service-messages` serverless specification, the messages API endpoints are created within the API provisioned in the `api` project.

## Prerequisites

The following are required to deploy and run this sample.

* [NVM with Node 14.x (lts/fermium)][nvm]
* [Yarn][yarn]
* [Serverless Framework][sls]
* A domain name configured in AWS Route53
* A certificate configured in AWS Certificate Manager

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

### Provision the Custom Domain

Update the `serverless.yml` file in the `api` sub-directory to use your domain name and certificate.

Run the following command in the sample base directory:

```
sls create_domain

or...

sls create_domain [--aws-profile profileName]
```

This command will produce output similar to:

```
Serverless Domain Manager: Info: Custom domain serverless-samples.leanstacks.net was created. New domains may take up to 40 minutes to be initialized.
```

**Note:** It may require up to **40 minutes** for an API Gateway custom domain to be fully provisioned in AWS. You may sign into the AWS console, go to API Gateway and Custom domain names to verify the status of your custom domain name. If the status is *Available*, your API Gateway custom domain name is ready.

### Deploy the API Component

Run the following command first in the `api` directory:

```
sls deploy

or...

sls deploy --aws-profile [profileName]
```

The command output will look similar to:

```
Serverless: Stack update finished...
Service Information
service: samples-sacd-base
stage: dev
region: us-east-1
stack: samples-sacd-base-dev
resources: 11
api keys:
  None
endpoints:
  GET - https://49iududy9j.execute-api.us-east-1.amazonaws.com/dev/info
functions:
  info: samples-sacd-base-dev-info
layers:
  None
Serverless Domain Manager: Info: Found apiId: 49iududy9j for serverless-samples-dev.leanstacks.net
Serverless Domain Manager: Info: Created API mapping '(none)' for serverless-samples-dev.leanstacks.net
Serverless Domain Manager: Summary: Distribution Domain Name
Serverless Domain Manager:    Domain Name: serverless-samples-dev.leanstacks.net
Serverless Domain Manager:    Target Domain: d3b9osdj9yosi5.cloudfront.net
Serverless Domain Manager:    Hosted Zone Id: Z2FDTNDATAQYW2
```

### Deploy the Message Service Component

Run the following command second in the `service-messages` directory:

```
sls deploy

or...

sls deploy --aws-profile [profileName]
```

The command output will look similar to:

```
Serverless: Stack update finished...
Service Information
service: samples-sacd-messages
stage: dev
region: us-east-1
stack: samples-sacd-messages-dev
resources: 16
api keys:
  None
endpoints:
  GET - https://49iududy9j.execute-api.us-east-1.amazonaws.com/dev/messages/{proxy+}
  GET - https://49iududy9j.execute-api.us-east-1.amazonaws.com/dev/messages
functions:
  getMessage: samples-sacd-messages-dev-getMessage
  listMessages: samples-sacd-messages-dev-listMessages
layers:
  None
```

## Remove from AWS

### Remove the Message Service Component

Run the following command first in the `service-messages` directory:

```
sls remove

or...

sls remove --aws-profile [profileName]
```

### Remove the API Component

Run the following command second in the `api` directory:

```
sls remove

or...

sls remove --aws-profile [profileName]
```

### Remove the Custom Domain

Run the following command in the sample base directory to clean up and remove the custom domain resources from AWS:

```
sls delete_domain

or...

sls delete_domain [--aws-profile profileName]
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
curl [-v] https://[customDomain]/info

example...

curl -v https://serverless-samples-dev.leanstacks.net/info
```

### List Messages

To invoke the `GET /messages` API, execute the following command from a terminal prompt.

```
curl [-v] https://[customDomain]/messages

example...

curl -v https://serverless-samples-dev.leanstacks.net/messages
```

### Find Message

To invoke the `GET /messages/:messageId` API, execute the following command from a terminal prompt.

**Note:** Try message IDs: `hello` or `goodbye` or `blah`.

```
curl [-v] https://[customDomain]/messages/:messageId

example...

curl -v https://serverless-samples-dev.leanstacks.net/messages/hello
```

## See Also

[Share API Gateway and API Resources][sls-sharedapi]  
[Reference CloudFormation Outputs](https://serverless.com/framework/docs/providers/aws/guide/variables#reference-cloudformation-outputs "Reference CloudFormation Outputs | Serverless Docs")  
[How to deploy multiple services under one API domain with Serverless](https://www.serverless.com/blog/api-gateway-multiple-services/)  

[sls-sharedapi]: https://serverless.com/framework/docs/providers/aws/events/apigateway#share-api-gateway-and-api-resources "Share API Gateway and API Resources | Serverless Docs"  
[nvm]: https://github.com/nvm-sh/nvm "Node Version Manager"  
[yarn]: https://yarnpkg.com/ "Yarn Package Manager"  
[sls]: https://www.serverless.com/ "Serverless Framework"  
[postman]: https://www.postman.com/ "Postman API platform"  
