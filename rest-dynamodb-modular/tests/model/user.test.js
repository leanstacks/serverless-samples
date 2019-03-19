const userModel = require('../../model/user');

const user = require('../fixtures/user');

/* Test: Get single User model. */
test('should fetch user from database', () => {
  // mock the database client
  const db = {
    get: jest.fn((params, cb) => {
      cb(null, { Item: user });
    })
  };

  // Jest automatically waits for returned Promises to resolve or reject
  return userModel.get(user.userId, db).then(data => {
    expect(db.get).toHaveBeenCalled();
    expect(data).toEqual(user);
  });
});

/* Test: Get single User model not found. */
test('should not find user in database', () => {
  // mock the database client
  const db = {
    get: jest.fn((params, cb) => {
      cb(null, {});
    })
  };

  // Jest automatically waits for returned Promises to resolve or reject
  return userModel.get(user.userId, db).then(data => {
    expect(db.get).toHaveBeenCalled();
    expect(data).toBeFalsy();
  });
});

/* Test: Get single User model has database client error. */
test('should reject promise with error', () => {
  // mock the database client
  const db = {
    get: jest.fn((params, cb) => {
      cb({ code: 'MockError', message: 'Mock error message.' }, null);
    })
  };

  // Jest automatically waits for returned Promises to resolve or reject
  return userModel.get(user.userId, db).catch(error => {
    expect(db.get).toHaveBeenCalled();
    expect(error).toEqual({
      code: 900,
      message: 'Database operation failed'
    });
  });
});
