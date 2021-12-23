import { User } from '../entity/UserEntity';
import { GetCommandInput, GetCommandOutput } from '@aws-sdk/lib-dynamodb';

const USERS_TABLE = process.env.USERS_TABLE || 'users-table';

export class FindUserCommandMapper {
  mapInput(userId: string): GetCommandInput {
    return {
      TableName: USERS_TABLE,
      Key: {
        userId,
      },
    };
  }

  mapOutput(output: GetCommandOutput): User {
    return output.Item as User;
  }
}
