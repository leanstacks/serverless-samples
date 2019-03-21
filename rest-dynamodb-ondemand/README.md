# Sample: REST Services with DynamoDB On-Demand

This sample serverless application is a basic example of how to implement REST services for a simple *User* resource using NodeJS leveraging the Express framework. Data for the *User* resource is persisted in DynamoDB.

This sample application builds upon the introductory example for using DynamoDB found in the [rest-dynamodb](../rest-dynamodb) directory. This application illustrates how to provision the `UsersDynamoDBTable` resource using the [DynamoDB On-Demand capacity mode][sls-ddbod].

## How to Use

### Install Dependencies

Install the project dependencies with the Yarn package manager. Navigate to the application base directory and issue the following command:

```
yarn install
```

### Run the Application

Run the serverless application. Navigate to the application base directory and issue the following command:

```
sls deploy
```

The Serverless Framework packages and deploys the application to AWS. The framework writes information about the deployed application to the console. Be sure to note the endpoint URL(s) to use in testing.

To test the deployed application, you may use cURL, or better yet, a REST client such as Postman. Create a User in DynamoDB by POSTing to the API endpoint. Then fetch the user by GETting it from the API endpoint, passing the userId as a URL path parameter.

### Remove the Application

To remove the serverless application from AWS, navigate to the application base directory and issue the following command:

```
sls remove
```

## See Also
[DynamoDB On-Demand: When, why and how to use it in your serverless applications][sls-ddbod]  
[Announcing Amazon DynamoDB On-Demand](https://aws.amazon.com/about-aws/whats-new/2018/11/announcing-amazon-dynamodb-on-demand/ "Announcing AmazonDynamoDB On-Demand | AWS What's New")  
[Amazon DynamoDB On-Demand - No Capacity Planning and Pay-Per-Request Pricing](https://aws.amazon.com/blogs/aws/amazon-dynamodb-on-demand-no-capacity-planning-and-pay-per-request-pricing/ "DynamoDB on-Demand - Capacity Planning and Cost | AWS News Blog")  

[sls-ddbod]: https://serverless.com/blog/dynamodb-on-demand-serverless/ "DynamoDB on-Demand: When, Why, and How to use in Serverless | Serverless Blog"  
