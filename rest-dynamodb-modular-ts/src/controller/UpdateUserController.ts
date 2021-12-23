import express from 'express';
import { ExpressController } from './ExpressController';
import { UserService } from '../service/UserService';

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

export class UpdateUserController extends ExpressController {
  configureRoutes(): void {
    this.router.put(this.path, this.handle);
  }

  async handleRoute(req: express.Request, res: express.Response): Promise<void> {
    console.log(`UpdateUserController::handleRequest`);

    const user = await new UserService().updateUser(req.body);

    res.append('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    if (!!user) {
      res.json(user);
    } else {
      res.status(404).end();
    }
  }

  isValidRequest(req: express.Request): boolean {
    const { name, userId } = req.body;

    const hasUserId = !!userId && typeof userId === 'string' && userId === req.params.userId;
    const hasName = !!name && typeof name === 'string';

    return hasUserId && hasName;
  }
}
