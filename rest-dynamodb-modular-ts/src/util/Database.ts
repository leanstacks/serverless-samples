import {
  DynamoDBDocumentClient,
  DeleteCommand,
  DeleteCommandInput,
  DeleteCommandOutput,
  GetCommand,
  GetCommandInput,
  GetCommandOutput,
  PutCommand,
  PutCommandInput,
  PutCommandOutput,
  ScanCommand,
  ScanCommandInput,
  ScanCommandOutput,
  UpdateCommand,
  UpdateCommandInput,
  UpdateCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';

// environment variables
const AWS_REGION = process.env.AWS_REGION || 'us-east-1';

// DynamoDB client configuration
const clientConfig: DynamoDBClientConfig = {
  region: AWS_REGION,
};

// DynamoDB document client configuration
const marshallOptions = {
  convertEmptyValues: false,
  removeUndefinedValues: true,
  convertClassInstanceToMap: false,
};
const unmarshallOptions = {
  wrapNumbers: false,
};
const translateConfig = { marshallOptions, unmarshallOptions };

export class Database {
  client: DynamoDBDocumentClient;

  constructor() {
    this.client = DynamoDBDocumentClient.from(new DynamoDBClient(clientConfig), translateConfig);
  }

  delete(input: DeleteCommandInput): Promise<DeleteCommandOutput> {
    return this.client.send(new DeleteCommand(input));
  }

  get(input: GetCommandInput): Promise<GetCommandOutput> {
    return this.client.send(new GetCommand(input));
  }

  put(input: PutCommandInput): Promise<PutCommandOutput> {
    return this.client.send(new PutCommand(input));
  }

  scan(input: ScanCommandInput): Promise<ScanCommandOutput> {
    return this.client.send(new ScanCommand(input));
  }

  update(input: UpdateCommandInput): Promise<UpdateCommandOutput> {
    return this.client.send(new UpdateCommand(input));
  }
}
