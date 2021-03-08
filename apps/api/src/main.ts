/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import { json } from 'body-parser';

export const app = express();

import recordRoutes from './routes/records';

app.use(json());

app.use('/records', recordRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});


const port = process.env.port || 3333;
export const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
server.on('error', console.error);
