# Sample: Environment Variables from AWS Systems Manager Parameter Store

This sample serverless application illustrates how to implement REST services whose functions are passed [environment variables][sls-envvar] sourced from [AWS Systems Manager Parameter Store][aws-paramstore]. 

Environment variables declared in the `provider` block are passed to all functions. Environment variables declared in a function block are passed only to that function.

## How to Use

### Create Parameters

Before deploying the serverless application you must create the parameters in AWS Systems Manager Parameter Store. Sign into the AWS console and navigate to [AWS Systems Manager](https://console.aws.amazon.com/systems-manager). Select _Parameter Store_ from the left side navigation menu.

In this example, [parameters are organized into a hierarchy][aws-paramhierarchy] with three levels:

/ServiceName/Stage/ParameterName

In the serverless specification, the parameters are retrieved with dynamic references to the service name and stage using the following syntax: `${ssm:/${self:service}/${self:provider.stage}/greeting-audience}`.

Create three SSM parameters to hold values for the `greeting-audience` varible in three stages: dev, qa, and prod. The parameters are:

```
/samples-environment-ssm/dev/greeting-audience     # Value=Developers
/samples-environment-ssm/qa/greeting-audience      # Value=Testers
/samples-environment-ssm/prod/greeting-audience    # Value=World
```

### Install Dependencies

Install the project dependencies with the Yarn package manager. Navigate to the application base directory and issue the following command:

```
yarn install
```

### Run the Application

Run the serverless application in offline mode. Navigate to the application base directory and issue the following command:

```
# Deploy to 'dev' stage by default
sls deploy

OR

# Deploy to a specific stage
sls deploy --stage prod
```

Test the application by calling the API endpoints:
- `GET /hello`
- `GET /goodbye`

Try deploying the application to different stages. Notice that the correct parameter value is used for each environment.

## See Also
[Serverless Functions - Environment Variables][sls-envvar]  
[Reference Variables using the SSM Parameter Store][sls-varssm]  
[AWS Systems Manager Parameter Store][aws-paramstore]  
[Organizing Parameters into Hierarchies][aws-paramhierarchy]  

[sls-envvar]: https://serverless.com/framework/docs/providers/aws/guide/functions/#environment-variables "Environment Variables | Serverless Docs"
[sls-varssm]: https://serverless.com/framework/docs/providers/aws/guide/variables#reference-variables-using-the-ssm-parameter-store "Reference Variables using the SSM Parameter Store | Serverless Docs"
[aws-paramstore]: https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-paramstore.html "AWS Systems Manager Parameter Store | AWS Docs"
[aws-paramhierarchy]: https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-su-organize.html "Organizing Parameters into Hierarchies | AWS Docs"