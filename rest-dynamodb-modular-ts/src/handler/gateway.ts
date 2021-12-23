import serverless from 'serverless-http';
import express from 'express';
import { CreateUserController } from '../controller/CreateUserController';
import { FindUserController } from '../controller/FindUserController';
import { ListUsersController } from '../controller/ListUsersController';
import { UpdateUserController } from '../controller/UpdateUserController';
import { DeleteUserController } from '../controller/DeleteUserController';

const app = express();

// configure Express middleware
app.use(express.json({ strict: false }));

// configure Controllers (i.e. Express Route Handlers) with the Express app
app.use('/', new FindUserController('/users/:userId').router);
app.use('/', new ListUsersController('/users').router);
app.use('/', new CreateUserController('/users').router);
app.use('/', new UpdateUserController('/users/:userId').router);
app.use('/', new DeleteUserController('/users/:userId').router);

// wrap Express with the serverless-http plugin
export const handle = serverless(app);
