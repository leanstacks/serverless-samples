# Sample: REST Services with DynamoDB on Localhost

This sample serverless application illustrates how to implement REST services for a simple *User* resource using NodeJS leveraging the Express framework. Data for the *User* resource is persisted in DynamoDB.

This sample application employs the `serverless-offline` and `serverless-dynamodb-local` libraries to facilitate rapid local machine development and testing, alleviating the need for frequent AWS deployments during the development process.

## How to Use

### Install Dependencies

Install the project dependencies with the Yarn package manager. Navigate to the application base directory and issue the following command:

```
yarn install
```

### Initialize Local DynamoDB

Initialize the local DynamoDB database. Navigate to the application base directory and issue the following command:

```
sls dynamodb install
```

DynamoDB is configured to run on port 8000.

**Note:** To remove the local dynamodb run: `sls dynamodb remove`

### Run the Application

Run the serverless application in offline mode. Navigate to the application base directory and issue the following command:

```
sls offline start
```

The application listens for requests on port 3000. Therefore, the base URL for requests is `http://localhost:3000`.  For example, to send a request to the _get users_ endpoint, you would use `http://localhost:3000/users`.

**Note:** To stop the offline mode process, press `ctrl-C` on your keyboard.
