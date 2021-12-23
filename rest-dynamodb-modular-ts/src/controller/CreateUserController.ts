import express from 'express';
import { ExpressController } from './ExpressController';
import { UserService } from '../service/UserService';

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

export class CreateUserController extends ExpressController {
  configureRoutes(): void {
    this.router.post(this.path, this.handle);
  }

  async handleRoute(req: express.Request, res: express.Response): Promise<void> {
    console.log(`CreateUserController::handleRequest`);

    const user = await new UserService().createUser(req.body);

    res.append('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    res.status(201);
    res.json(user);
  }

  isValidRequest(req: express.Request): boolean {
    const { name } = req.body;

    const hasName = !!name && typeof name === 'string';

    return hasName;
  }
}
