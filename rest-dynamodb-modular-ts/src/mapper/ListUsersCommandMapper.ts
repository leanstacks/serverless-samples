import { User } from '../entity/UserEntity';
import { ScanCommandInput, ScanCommandOutput } from '@aws-sdk/lib-dynamodb';

const USERS_TABLE = process.env.USERS_TABLE || 'users-table';

export class ListUsersCommandMapper {
  mapInput(): ScanCommandInput {
    return {
      TableName: USERS_TABLE,
    };
  }

  mapOutput(output: ScanCommandOutput): User[] {
    return output.Items as User[];
  }
}
