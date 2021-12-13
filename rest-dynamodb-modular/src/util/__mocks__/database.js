const { usersFixture } = require('../../tests/fixtures/user');

exports.get = (userId) => {
  return new Promise((resolve, reject) => {
    process.nextTick(() => {
      const Item = usersFixture.find(user => user.userId === userId)
      resolve({
        data: {
          Item
        }
      });
    });
  });
};