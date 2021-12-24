import { User } from '../UserEntity';
import { usersFixture } from '../../tests/fixtures/users';

export class UserEntity {
  findAll(): Promise<User[]> {
    return Promise.resolve(usersFixture);
  }
}
