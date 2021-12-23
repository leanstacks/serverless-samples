import express from 'express';
import { ExpressController } from './ExpressController';
import { UserService } from '../service/UserService';

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

export class ListUsersController extends ExpressController {
  configureRoutes(): void {
    this.router.get(this.path, this.handle);
  }

  async handleRoute(req: express.Request, res: express.Response): Promise<void> {
    console.log(`ListUsersController::handleRequest`);

    const users = await new UserService().listUsers();
    res.append('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    res.json(users);
  }

  isValidRequest(req: express.Request): boolean {
    return true;
  }
}
