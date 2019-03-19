# Sample: REST Services with DynamoDB

This sample serverless application is a basic example of how to implement REST services for a simple *User* resource using NodeJS leveraging the Express framework. Data for the *User* resource is persisted in DynamoDB.

This sample application is the introductory example for using DynamoDB. This project contains other DynamoDB sample projects which build upon this one.

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

To remove the serverless application from AWS, navigate to the applicationb ase directory and issue the following command:

```
sls remove
```
