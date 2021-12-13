# Serverless Samples: custom-domain-multi-svc

This sample serverless application illustrates how to implement multiple REST services for simple *User* and *Product* resources using NodeJS leveraging the Express framework. Each service is developed independently; however, they share a custom domain. 

This sample application employs the `serverless-domain-manager` Serverless Framework plugin to facilitate the management of custom domains in the AWS API Gateway.

## Prerequisites

The following are required to deploy and run this sample.

* [NVM with Node 14.x (lts/fermium)][nvm]
* [Yarn][yarn]
* [Serverless Framework][sls]
* A domain name configured in AWS Route53
* A certificate configured in AWS Certificate Manager

Configure the Serverless framework with [AWS credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/).

## About

Each service is contained entirely within a nested sub-directory, `users-svc` and `products-svc`. The services may be organized in any manner which suits your organization, e.g. sub-directories or separate repositories. The project organization does not impact the functionality.

For each service project, perform the following steps:

## Install

Navigate to each of the sub-project base directories and run the following command:

```
nvm use

yarn install
```

## Deploy to AWS

### Provision the Custom Domain

Update the `serverless.yml` files to use your domain name.

Navigate to **ONE** of the sub-project base directories and run the following command:

```
sls create_domain

or...

sls create_domain [--aws-profile profileName]
```

This command will produce output similar to:

```
Serverless Domain Manager: Info: Custom domain serverless-samples-dev.leanstacks.net was created. New domains may take up to 40 minutes to be initialized.
```

**Note:** It may require up to **40 minutes** for an API Gateway custom domain to be fully provisioned in AWS. You may sign into the AWS console, go to API Gateway and Custom domain names to verify the status of your custom domain name. If the status is *Available*, your API Gateway custom domain name is ready.

**Note:** You need to do this in just ONE (products or users) sub-project. The other sub-project will automatically detect the custom sub-domain when the component is deployed to AWS.

### Deploy the Application Components

Navigate to **EACH** of the sub-project base directories and run the following command:

```
sls deploy

or

sls deploy --aws-profile [profileName]
```

The command output will look similar to:

```
Service Information
service: samples-custom-domain-users
stage: dev
region: us-east-1
stack: samples-custom-domain-users-dev
resources: 10
api keys:
  None
endpoints:
  GET - https://po52a8hqy7.execute-api.us-east-1.amazonaws.com/dev/
functions:
  getUsers: samples-custom-domain-users-dev-getUsers
layers:
  None
Serverless Domain Manager: Info: Found apiId: po52a8hqy7 for serverless-samples-dev.leanstacks.net
Serverless Domain Manager: Info: Created API mapping 'users' for serverless-samples-dev.leanstacks.net
Serverless Domain Manager: Summary: Distribution Domain Name
Serverless Domain Manager:    Domain Name: serverless-samples-dev.leanstacks.net
Serverless Domain Manager:    Target Domain: d2kq75m79wa94m.cloudfront.net
Serverless Domain Manager:    Hosted Zone Id: Z3FDTNDATAQYW2
```

## Remove from AWS

### Remove the Application Components

Navigate to each of the sub-project base directories and run the following command to clean up and remove all AWS resources deployed for that sub-project.

```
sls remove

or

sls remove --aws-profile [profileName]
```

### Remove the Custom Domain

Navigate to **ONE** of the sub-project base directories and run the following command to clean up and remove the custom domain resources from AWS:

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

### List Products

To invoke the `/products` API, execute the following command from a terminal prompt.

```
curl [-v] https://[customDomain]/products

e.g.

curl -v https://serverless-samples-dev.leanstacks.net/products
```

### List Users

To invoke the `/users` API, execute the following command from a terminal prompt.

```
curl [-v] https://[customDomain]/users

e.g.

curl -v https://serverless-samples-dev.leanstacks.net/users
```

[nvm]: https://github.com/nvm-sh/nvm "Node Version Manager"
[yarn]: https://yarnpkg.com/ "Yarn Package Manager"
[sls]: https://www.serverless.com/ "Serverless Framework"
[postman]: https://www.postman.com/ "Postman API platform"
