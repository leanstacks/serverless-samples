jest.mock('../../util/database');

const UserService = require('../../service/user-service');

const { userFixture } = require('../fixtures/user');

test('should find user in database', async () => {
  const user = await UserService.find(userFixture.userId);
  expect(user).toEqual(userFixture.user);
});

test('should NOT find user in database', async () => {
  const user = await UserService.find('DoesNotExist');
  expect(user).toBeFalsy();
});