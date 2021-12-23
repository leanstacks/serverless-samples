import { User } from '../entity/UserEntity';
import { UpdateCommandInput, UpdateCommandOutput } from '@aws-sdk/lib-dynamodb';

const USERS_TABLE = process.env.USERS_TABLE || 'users-table';

export class UpdateUserCommandMapper {
  mapInput(user: User): UpdateCommandInput {
    const { userId, name, updatedAt } = user;
    return {
      TableName: USERS_TABLE,
      Key: {
        userId,
      },
      UpdateExpression: 'set #nm = :nm, updatedAt = :ua',
      ConditionExpression: 'userId = :uid',
      ExpressionAttributeNames: {
        '#nm': 'name',
      },
      ExpressionAttributeValues: {
        ':uid': userId,
        ':nm': name,
        ':ua': updatedAt,
      },
      ReturnValues: 'ALL_NEW',
    };
  }

  mapOutput(output: UpdateCommandOutput): User {
    return output.Attributes as User;
  }
}
