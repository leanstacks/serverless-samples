# Serverless Samples: rest-environment-ssm

This sample serverless application illustrates how to implement REST services whose functions are passed [environment variables][sls-envvar] sourced from [AWS Systems Manager Parameter Store][aws-paramstore]. 

Environment variables declared in the `provider` block are passed to all functions. Environment variables declared in a function block are passed only to that function.


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

## Create Parameters

Before deploying the serverless application you must create the parameters in AWS Systems Manager Parameter Store. Sign into the AWS console and navigate to [AWS Systems Manager](https://console.aws.amazon.com/systems-manager). Select _Parameter Store_ from the left side navigation menu.

In this example, [parameters are organized into a hierarchy][aws-paramhierarchy] with three levels:

/ServiceName/Stage/ParameterName

In the serverless specification, the parameters are retrieved with dynamic references to the service name and stage using the following syntax: `${ssm:/${self:service}/${self:custom.stage}/greeting-audience}`.

Create three SSM parameters to hold values for the `greeting-audience` varible in three stages: dev, qa, and prod. The parameters are:

```
/samples-environment-ssm/dev/greeting-audience     # Value=Developers
/samples-environment-ssm/qa/greeting-audience      # Value=Testers
/samples-environment-ssm/prod/greeting-audience    # Value=World
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

Supply the stage (dev, qa, prod) to see the stage-specific environment variables in use. If the `--stage` parameter is omitted, the default stage `dev` is applied.

The command output will print the URL for the API endpoints created by the Serverless template. It will look something like:  

```
Service Information
service: samples-environment-ssm
stage: qa
region: us-east-1
stack: samples-environment-ssm-qa
resources: 17
api keys:
  None
endpoints:
  GET - https://v7f3oydch9.execute-api.us-east-1.amazonaws.com/qa/hello
  GET - https://v7f3oydch9.execute-api.us-east-1.amazonaws.com/qa/goodbye
functions:
  hello: samples-environment-ssm-qa-hello
  goodbye: samples-environment-ssm-qa-goodbye
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

## See Also
[Serverless Functions - Environment Variables][sls-envvar]  
[Reference Variables using the SSM Parameter Store][sls-varssm]  
[AWS Systems Manager Parameter Store][aws-paramstore]  
[Organizing Parameters into Hierarchies][aws-paramhierarchy]  

[nvm]: https://github.com/nvm-sh/nvm "Node Version Manager"
[yarn]: https://yarnpkg.com/ "Yarn Package Manager"
[sls]: https://www.serverless.com/ "Serverless Framework"
[postman]: https://www.postman.com/ "Postman API platform"
[sls-envvar]: https://serverless.com/framework/docs/providers/aws/guide/functions/#environment-variables "Environment Variables | Serverless Docs"
[sls-varssm]: https://serverless.com/framework/docs/providers/aws/guide/variables#reference-variables-using-the-ssm-parameter-store "Reference Variables using the SSM Parameter Store | Serverless Docs"
[aws-paramstore]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-paramstore.html "AWS Systems Manager Parameter Store | AWS Docs"
[aws-paramhierarchy]: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-su-organize.html "Organizing Parameters into Hierarchies | AWS Docs"