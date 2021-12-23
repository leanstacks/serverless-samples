import { User } from '../entity/UserEntity';
import { DeleteCommandInput, DeleteCommandOutput } from '@aws-sdk/lib-dynamodb';

const USERS_TABLE = process.env.USERS_TABLE || 'users-table';

export class DeleteUserCommandMapper {
  mapInput(userId: string): DeleteCommandInput {
    return {
      TableName: USERS_TABLE,
      Key: {
        userId,
      },
    };
  }

  mapOutput(output: DeleteCommandOutput): User {
    return output.Attributes as User;
  }
}
