import express from 'express';
import { ValidationError } from '../error/ValidationError';

const ALLOW_ORIGIN = process.env.ALLOW_ORIGIN || '*';

// Controller responsibilities:
// * parse request
// * validate request
// * format response
export abstract class ExpressController {
  router = express.Router();
  abstract configureRoutes(): void;
  abstract isValidRequest(req: express.Request): boolean;
  abstract handleRoute(req: express.Request, res: express.Response): Promise<void>;

  constructor(public path: string) {
    this.init();
  }

  init(): void {
    this.configureRoutes();
  }

  // Express route handler function must be implemented as arrow function
  // to ensure the context of 'this' is associated with the controller class
  handle = async (req: express.Request, res: express.Response): Promise<void> => {
    console.log('ExpressController::handle');
    try {
      if (!this.isValidRequest(req)) {
        throw new ValidationError();
      }

      await this.handleRoute(req, res);
    } catch (error) {
      console.log('Error handling request. Detail:', error);
      this.handleError(res, error);
    }
  };

  handleError(res: express.Response, error: any): void {
    console.log('ExpressController::handleError');
    res.append('Access-Control-Allow-Origin', ALLOW_ORIGIN);
    if (error instanceof ValidationError) {
      const { code, message, name, status } = error;
      res.status(status);
      res.json({
        name,
        code,
        message,
      });
    } else if (error instanceof Error) {
      const code = 500;
      const status = 500;
      const { name, message } = error;
      res.status(status);
      res.json({
        name,
        code,
        message,
      });
    } else {
      res.status(500);
      res.json({
        code: 500,
        status: 500,
        name: 'Error',
        message: 'An unexpected problem has occurred',
      });
    }
  }
}
