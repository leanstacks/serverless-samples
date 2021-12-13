# Serverless Samples: rest-environment

This sample serverless application illustrates how to implement REST services whose functions are passed [environment variables](https://www.serverless.com/framework/docs/providers/aws/guide/functions/#environment-variables). 

Environment variables declared in the `provider` block are passed to all functions. Environment variables declared in a function block are passed only to that function. Different values may be configured for each *stage*.


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
sls deploy [--stage stageName]

or...

sls deploy [--stage stageName] --aws-profile [profileName]

example...

sls deploy --stage prod --aws-profile production
```

Supply the stage (dev, qa, prod) to see how stage-specific environment variables are configured. If the `--stage` parameter is omitted, the default stage `dev` is used.

The command output will print the URL for the API endpoints created by the Serverless template. It will look something like:  

```
Serverless: Stack update finished...
Service Information
service: samples-rest-environment
stage: dev
region: us-east-1
stack: samples-rest-environment-dev
resources: 17
api keys:
  None
endpoints:
  GET - https://x4dj4gtsp3.execute-api.us-east-1.amazonaws.com/dev/hello
  GET - https://x4dj4gtsp3.execute-api.us-east-1.amazonaws.com/dev/goodbye
functions:
  hello: samples-rest-environment-dev-hello
  goodbye: samples-rest-environment-dev-goodbye
layers:
  None
```

## Remove from AWS

Run the following command in the sample base directory to clean up and remove all AWS resources deployed by this sample:

```
sls remove [--stage stageName]

or...

sls remove [--stage stageName] --aws-profile [profileName]

example...

sls remove --stage prod --aws-profile production
```

## Run

We recommend that you use an API client such as [Postman][postman] to exercise this sample.

Using `curl`:

```
curl [-v] [endpointUrl]

examples...

curl -v https://x4dj4gtsp3.execute-api.us-east-1.amazonaws.com/dev/hello

curl -v https://x4dj4gtsp3.execute-api.us-east-1.amazonaws.com/dev/goodbye
```

[nvm]: https://github.com/nvm-sh/nvm "Node Version Manager"
[yarn]: https://yarnpkg.com/ "Yarn Package Manager"
[sls]: https://www.serverless.com/ "Serverless Framework"
[postman]: https://www.postman.com/ "Postman API platform"