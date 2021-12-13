const serverless = require('serverless-http');
const express = require('express');
const app = express();

const findUser = require('../controller/user-find');
const listUsers = require('../controller/user-list');
const createUser = require('../controller/user-create');
const updateUser = require('../controller/user-update');
const deleteUser = require('../controller/user-delete');

// configure Express middleware
app.use(express.json({ strict: false }));

// configure Express routes
app.get('/users/:userId', findUser);
app.get('/users', listUsers);
app.post('/users', createUser);
app.put('/users/:userId', updateUser);
app.delete('/users/:userId', deleteUser);

// wrap Express with the serverless-http plugin
module.exports.handle = serverless(app);