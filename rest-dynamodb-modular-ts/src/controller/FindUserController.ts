import express from 'express';
import { ExpressController } from './ExpressController';
import { UserService } from '../service/UserService';

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

export class FindUserController extends ExpressController {
  configureRoutes(): void {
    this.router.get(this.path, this.handle);
  }

  async handleRoute(req: express.Request, res: express.Response): Promise<void> {
    console.log(`FindUserController::handleRequest`);

    const { userId } = req.params;
    const user = await new UserService().findUser(userId);

    res.append('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    if (!!user) {
      res.json(user);
    } else {
      res.status(404).end();
    }
  }

  isValidRequest(req: express.Request): boolean {
    const { userId } = req.params;

    const hasUserId = !!userId && typeof userId === 'string';

    return hasUserId;
  }
}
