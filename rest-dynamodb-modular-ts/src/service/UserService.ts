import { Database } from '../util/Database';
import { User, UserEntity } from '../entity/UserEntity';
import { ValidationError } from '../error/ValidationError';

export class UserService {
  private database: Database;

  constructor() {
    this.database = new Database();
  }

  findUser(userId: string): Promise<User> {
    console.log('UserService::findUser');

    return new UserEntity(this.database).find(userId);
  }

  listUsers(): Promise<User[]> {
    console.log('UserService::list');

    return new UserEntity(this.database).findAll();
  }

  async createUser(user: User): Promise<User> {
    console.log('UserService::createUser');

    try {
      const { name, userId } = user;
      const createdAt = new Date().toISOString();
      const userObj = {
        userId,
        name,
        createdAt,
      };

      await new UserEntity(this.database).create(userObj);
      return userObj;
    } catch (error: any) {
      if (error.name === 'ConditionalCheckFailedException') {
        throw new ValidationError('User values in use.');
      }
      throw error;
    }
  }

  async updateUser(user: User): Promise<User | null> {
    console.log('UserService::updateUser');

    try {
      const { name, userId } = user;
      const updatedAt = new Date().toISOString();
      const userObj = {
        userId,
        name,
        updatedAt,
      };

      return await new UserEntity(this.database).update(userObj);
    } catch (error: any) {
      if (error.name === 'ConditionalCheckFailedException') {
        return null;
      }
      throw error;
    }
  }

  async deleteUser(userId: string): Promise<void> {
    console.log('UserService::deleteUser');

    await new UserEntity(this.database).delete(userId);
  }
}
