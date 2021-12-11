# Serverless Samples: custom-domain

This sample serverless application is a basic example of how to implement a REST API with a custom domain name.

## Prerequisites

The following are required to deploy and run this sample.

* [NVM with Node 14.x (lts/fermium)][nvm]
* [Yarn][yarn]
* [Serverless Framework][sls]
* A domain name configured in AWS Route53
* A certificate configured in AWS Certificate Manager

Configure the Serverless framework with [AWS credentials](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/).

## Install

Run the following command in the sample base directory:

```
nvm use

yarn install
```

## Deploy to AWS

### Provision the Custom Domain

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

### Deploy the Application Component

Run the following command in the sample base directory:

```
sls deploy

or

sls deploy --aws-profile [profileName]
```

The command output will look similar to:

```
Serverless: Stack update finished...
Service Information
service: samples-custom-domain
stage: dev
region: us-east-1
stack: samples-custom-domain-dev
resources: 17
api keys:
  None
endpoints:
  GET - https://xkds84hzb1.execute-api.us-east-1.amazonaws.com/dev/hello
  GET - https://xkds84hzb1.execute-api.us-east-1.amazonaws.com/dev/goodbye
functions:
  hello: samples-custom-domain-dev-hello
  goodbye: samples-custom-domain-dev-goodbye
layers:
  None
Serverless Domain Manager: Info: Found apiId: xkds84hzb1 for serverless-samples.leanstacks.net
Serverless Domain Manager: Info: Created API mapping '(none)' for serverless-samples.leanstacks.net
Serverless Domain Manager: Summary: Distribution Domain Name
Serverless Domain Manager:    Domain Name: serverless-samples.leanstacks.net
Serverless Domain Manager:    Target Domain: d3v5lodm8ouxhe.cloudfront.net
Serverless Domain Manager:    Hosted Zone Id: Z2FDTNDATAQYW2
```

## Remove from AWS

### Remove the Application Component

Run the following command in the sample base directory to clean up and remove all AWS resources deployed by this sample:

```
sls remove

or

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

### Hello

To invoke the `hello` API, execute the following command from a terminal prompt.

```
curl [-v] https://[customDomain]/hello

e.g.

curl -v https://serverless-samples.leanstacks.net/hello
```

### Goodbye

To invoke the `goodbye` API, execute the following command from a terminal prompt.

```
curl [-v] https://[customDomain]/goodbye

e.g.

curl -v https://serverless-samples.leanstacks.net/goodbye
```

[nvm]: https://github.com/nvm-sh/nvm "Node Version Manager"
[yarn]: https://yarnpkg.com/ "Yarn Package Manager"
[sls]: https://www.serverless.com/ "Serverless Framework"
[postman]: https://www.postman.com/ "Postman API platform"