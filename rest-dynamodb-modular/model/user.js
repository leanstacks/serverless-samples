const { 
  buildGetUserParams, 
  buildListUsersParams,
  buildCreateUserParams,
  buildUpdateUserParams,
  buildDeleteUserParams
} = require('../params/user');

exports.get = (userId, db) => {
  const params = buildGetUserParams(userId);

  return new Promise(
    (resolve, reject) => {
      db.get(params, (err, data) => {
        if (err) {
          console.log(`DynamoDB error: ${JSON.stringify(err)}`);
          reject({
            code: 900,
            message: 'Database operation failed'
          });
        } else {
          if (data.Item) {
            console.log(`Success. data.Item: ${JSON.stringify(data.Item, null, 2)}`);
            resolve(data.Item);
          } else {
            console.log(`Not found`);
            resolve();
          }
        }
      });
    }
  );
};

exports.list = (db) => {
  const params = buildListUsersParams();

  return new Promise(
    (resolve, reject) => {
      db.scan(params, (err, data) => {
        if (err) {
          console.log(`DynamoDB error: ${JSON.stringify(err)}`);
          reject({
            code: 900,
            message: 'Database operation failed'
          });
        } else {
          resolve(data.Items);
        }
      });
    }
  );
};

exports.create = (user, db) => {
  const params = buildCreateUserParams(user);

  return new Promise(
    (resolve, reject) => {
      db.put(params, (err) => {
        if (err) {
          console.log(`DynamoDB error: ${JSON.stringify(err)}`);
          if (err.code === 'ConditionalCheckFailedException') {
            reject({
              code: 901,
              message: 'User exists'
            });
          } else {
            reject({
              code: 900,
              message: 'Database operation failed'
            });  
          }
        } else {
          resolve(user);
        }
      });
    }
  );
};

exports.update = (user, db) => {
  const params = buildUpdateUserParams(user);

  return new Promise(
    (resolve, reject) => {
      db.update(params, (err, data) => {
        if (err) {
          console.log(`DynamoDB error: ${JSON.stringify(err)}`);
          if (err.code == 'ConditionalCheckFailedException'){
            resolve();
          } else {
            reject({
              code: 900,
              message: 'Database operation failed'
            });
          }
        } else {
          resolve({ 
            userId: user.userId, 
            name: data.Attributes.name
          });
        }
      });
    }
  );
};

exports.delete = (userId, db) => {
  const params = buildDeleteUserParams(userId);

  return new Promise(
    (resolve, reject) => {
      db.delete(params, (err) => {
        if (err) {
          console.log(`DynamoDB error: ${JSON.stringify(err)}`);
          reject({
            code: 900,
            message: 'Database operation failed'
          });
        } else {
          resolve();
        }
      });
    }
  );
};