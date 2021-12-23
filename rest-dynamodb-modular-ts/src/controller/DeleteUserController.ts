import express from 'express';
import { ExpressController } from './ExpressController';
import { UserService } from '../service/UserService';

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

export class DeleteUserController extends ExpressController {
  configureRoutes(): void {
    this.router.delete(this.path, this.handle);
  }

  async handleRoute(req: express.Request, res: express.Response): Promise<void> {
    console.log(`DeleteUserController::handleRequest`);

    const user = req.body;
    await new UserService().deleteUser(user.userId);

    res.append('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    res.status(204);
    res.end();
  }

  isValidRequest(req: express.Request): boolean {
    const { userId } = req.body;

    const hasUserId = !!userId && typeof userId === 'string' && userId === req.params.userId;

    return hasUserId;
  }
}
