import serverless from 'serverless-http';
import express, { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello World!');
});

export const handler = serverless(app);
