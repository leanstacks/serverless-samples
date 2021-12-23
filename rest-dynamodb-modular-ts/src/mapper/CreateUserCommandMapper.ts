import { User } from '../entity/UserEntity';
import { PutCommandInput, PutCommandOutput } from '@aws-sdk/lib-dynamodb';

const USERS_TABLE = process.env.USERS_TABLE || 'users-table';

export class CreateUserCommandMapper {
  mapInput(user: User): PutCommandInput {
    return {
      TableName: USERS_TABLE,
      Item: user,
      ConditionExpression: 'attribute_not_exists(userId)',
    };
  }

  mapOutput(output: PutCommandOutput): User {
    return output.Attributes as User;
  }
}
