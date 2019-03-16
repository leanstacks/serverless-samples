# Sample: REST Services with Environment Variables

This sample serverless application illustrates how to implement REST services whose functions are passed [environment variables][sls-envvar]. Environment variables declared in the `provider` block are passed to all functions. Environment variables declared in a function block are passed only to that function.

## How to Use

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

[sls-envvar]: https://serverless.com/framework/docs/providers/aws/guide/functions/#environment-variables "Environment Variables | Serverless Docs"