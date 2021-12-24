import { UserService } from '../../service/UserService';
import { usersFixture } from '../fixtures/users';

jest.mock('../../entity/UserEntity');

describe('UserService', () => {
  describe('listUsers', () => {
    test('should return users', async () => {
      const service = new UserService();
      const result = await service.listUsers();
      expect(result).toEqual(usersFixture);
      expect(result instanceof Array).toBe(true);
      expect(result.length).toBe(2);
    });
  });
});
