import express, { Express, Request, Response } from 'express';
import { activityTypes } from './routes';

const server: Express = express();
const port = 3100;

server.all('/activitytype/*', activityTypes);

server.get('/', (_: Request, res: Response) => {
  res.send('Hello world!');
});

server.listen(port, () => {
  console.log(`Listening on port ${port}..`);
});
