# Sample: REST Services with Shared API and Custom Domain

This sample serverless application builds upon the example of how to implement a [shared API Gateway REST API][sls-sharedapi]. (See the [shared-api](../shared-api) sample.) In addition to the ability for multiple Serverless Framework projects to share a single API Gateway REST API, this project demonstrates how to use a custom domain name to access those services.

This sample has two sub-directories. The `api` directory contains a serverless specification which provisions the API Gateway REST API and custom domain. The `service-messages` directory contains a serverless specification which provisions the functions and API resources for a *messages* resource. For this simple example, these are nested sub-directories; however, they could easily reside in dedicated SCM repositories. This approach allows individual services to have their own lifecycle and be maintained by separate teams.

Normally, each serverless specification provisions a dedicated API Gateway REST API when deployed. However, by using the outputs from the `api` project in the `service-messages` serverless specification, the messages API endpoints are created within the API provisioned in the `api` project.

## How to Use

First for the `api` project and then, second, for the `service-messages` project, follow the steps below. It is important that you *deploy* the `api` project first because the `service-messages` project references resources deployed by the `api` project.

Likewise, when cleaning up AWS, order matters. It is important to *remove* the `api` project last.

### Install Dependencies

Install the project dependencies with the Yarn package manager. Navigate to the application base directory and issue the following command:

```
yarn install
```

### Create the Custom Domain(s)

**Note:** This needs to be performed just once (unless you remove the custom domain from your AWS account).

Navigate to the base directory of the `api` project and issue the following command:

```
sls create_domain
```

Notice the console log output from the command. It can take several minutes for AWS to provision the custom domain and replicate it to all CloudFront edge servers. So go grab some coffee before you go to the next step. 

You may monitor the progress of custom domain provisioning in the AWS Console. After signing in, go to the API Gateway service and navigate to the [Custom Domain Names](https://console.aws.amazon.com/apigateway/home?region=us-east-1#/custom-domain-names) section.

### Run the Application

Run the serverless application. Navigate to the application base directory and issue the following command:

```
sls deploy
```

The Serverless Framework packages and deploys the application to AWS. The framework writes information about the deployed application to the console. Be sure to note the endpoint URL(s) to use in testing.

To test the deployed application, you may use cURL, or better yet, a REST client such as Postman. Create a request for the `/info` endpoint to test the endpoint deployed by the `api` project. Create a request for `/messages/hello`, `/messages/goodbye`, or `/messages` endpoints to test the endpoints deployed by the `service-messages` project.

Note that the base URL for the endpoints deployed by both projects is the same. This is because both projects are sharing the same API Gateway REST API. Furthermore, notice the output from deploying the `api` project references the custom domain name. Use the custom domain name to test the endpoints, e.g. https://serverless-samples-dev.leanstacks.net/info.

### Remove the Application

To remove the serverless application from AWS, navigate to the application base directory and issue the following command:

```
sls remove
```

### Remove the Custom Domain(s)

To remove the custom domain from AWS, navigate to the base directory of the `api` project and issue the following command:

```
sls delete_domain
```

**Note:** This step is optional. There is no cost associated with API Gateway custom domain names. If you plan to use this custom domain name again, save time by keeping the domain name provisioned until you no longer wish to use it.

## See Also

[Share API Gateway and API Resources][sls-sharedapi]  
[Reference CloudFormation Outputs](https://serverless.com/framework/docs/providers/aws/guide/variables#reference-cloudformation-outputs "Reference CloudFormation Outputs | Serverless Docs")  
[How to deploy multiple services under one API domain with Serverless][sls-multisvc]  

[sls-sharedapi]: https://serverless.com/framework/docs/providers/aws/events/apigateway#share-api-gateway-and-api-resources "Share API Gateway and API Resources | Serverless Docs"  
[sls-multisvc]: https://serverless.com/blog/api-gateway-multiple-services/ "Deploy multiple services under one API Domain | Serverless Blog"  
