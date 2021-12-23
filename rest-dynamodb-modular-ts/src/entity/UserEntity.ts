import { Entity } from './Entity';
import { Database } from '../util/Database';
import { CreateUserCommandMapper } from '../mapper/CreateUserCommandMapper';
import { FindUserCommandMapper } from '../mapper/FindUserCommandMapper';
import { ListUsersCommandMapper } from '../mapper/ListUsersCommandMapper';
import { UpdateUserCommandMapper } from '../mapper/UpdateUserCommandMapper';
import { DeleteUserCommandMapper } from '../mapper/DeleteUserCommandMapper';

export interface User {
  userId: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export class UserEntity implements Entity<User, string> {
  private database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async find(id: string): Promise<User> {
    console.log('UserEntity::find');
    const mapper = new FindUserCommandMapper();
    const result = await this.database.get(mapper.mapInput(id));
    return mapper.mapOutput(result);
  }

  async findAll(): Promise<User[]> {
    console.log('UserEntity::findAll');
    const mapper = new ListUsersCommandMapper();
    const result = await this.database.scan(mapper.mapInput());
    return mapper.mapOutput(result);
  }

  async create(entity: User): Promise<void> {
    console.log('UserEntity::create');
    const mapper = new CreateUserCommandMapper();
    await this.database.put(mapper.mapInput(entity));
  }

  async update(entity: User): Promise<User> {
    console.log('UserEntity::update');
    const mapper = new UpdateUserCommandMapper();
    const result = await this.database.update(mapper.mapInput(entity));
    return mapper.mapOutput(result);
  }

  async delete(id: string): Promise<void> {
    console.log('UserEntity::delete');
    const mapper = new DeleteUserCommandMapper();
    await this.database.delete(mapper.mapInput(id));
  }
}
