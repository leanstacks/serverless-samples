# Sample: Single Custom Domain with Multiple Services

This sample serverless application illustrates how to implement multiple REST services for simple *User* and *Product* resources using NodeJS leveraging the Express framework. Each service is developed independently; however, they share a custom domain. 

This sample application employs the `serverless-domain-manager` library to facilitate the management of custom domains in the AWS API Gateway.

## How to Use

Each service is contained entirely within a nested sub-directory, `users-svc` and `products-svc`. The services may be organized in any manner which suits your organization, e.g. sub-directories or separate repositories. The project organization does not impact the functionality.

For each service project, perform the following steps:

### Install Dependencies

Install the project dependencies with the Yarn package manager. Navigate to the service base directory and issue the following command:

```
yarn install
```

### Deploy the Application

Deploy the serverless service to AWS. Navigate to the service base directory and issue the following command:

```
# To deploy to development (--stage=dev)
sls deploy    

OR

# To deploy to another stage (a.k.a. environment)
sls deploy --stage=stageName

# Example: Production
sls deploy --stage=prod
```

**Note:** Leveraging the Serverless Framework's variable system, the domain name is derived based upon the stage variable value.

The output from `sls deploy` for the `products-svc` is similar to:

```
$ sls deploy --stage=prod
Serverless: Packaging service...
Serverless: Excluding development dependencies...
Serverless: Creating Stack...
Serverless: Checking Stack create progress...
.....
Serverless: Stack create finished...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service samples-custom-domain-products.zip file to S3 (671.69 KB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
............................
Serverless: Stack update finished...
Service Information
service: samples-custom-domain-products
stage: prod
region: us-east-1
stack: samples-custom-domain-products-prod
resources: 9
api keys:
  None
endpoints:
  GET - https://wm26odctui.execute-api.us-east-1.amazonaws.com/prod
functions:
  getProducts: samples-custom-domain-products-prod-getProducts
layers:
  None
Serverless: Created basepath mapping.
Serverless Domain Manager Summary
Domain Name
  serverless-samples.leanstacks.net
Distribution Domain Name
  d3fl9fubam7aup.cloudfront.net
```

Notice that the *endpoint* receives an AWS API Gateway DNS name, which is cryptic and includes the stage name. To host services under a common, custom domain name, the endpoint is associated with the *Domain Name* which is a DNS alias that configured in the Serverless configuration file. In this example, the `/products` endpoint is available at: `https://serverless-samples.leanstacks.net/products`
