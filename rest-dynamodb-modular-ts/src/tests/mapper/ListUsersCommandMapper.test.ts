import { ListUsersCommandMapper } from '../../mapper/ListUsersCommandMapper';
import { usersFixture } from '../fixtures/users';

describe('ListUsersCommandMapper', () => {
  describe('mapInput', () => {
    test('should map input', () => {
      const expected = {
        TableName: 'users-table',
      };

      const mapper = new ListUsersCommandMapper();
      const result = mapper.mapInput();

      expect(result).toEqual(expected);
    });
  });

  describe('mapOutput', () => {
    test('should map output', () => {
      const output = {
        $metadata: '',
        Items: usersFixture,
      };

      const mapper = new ListUsersCommandMapper();
      const result = mapper.mapOutput(output);

      expect(result).toEqual(usersFixture);
      expect(result instanceof Array).toBe(true);
      expect(result.length).toBe(2);
    });
  });
});
