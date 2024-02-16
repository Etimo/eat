import express, { Express, Request, Response } from 'express';
import * as firebaseAdmin from 'firebase-admin/app';
import * as firebaseStore from 'firebase-admin/firestore';
import { activities } from './routes';

const server: Express = express();
const port = 3100;

const serviceKeyPath = 'etimo-activity-tracker-firebase-admin.json';
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.cert(serviceKeyPath),
  databaseURL: 'https://etimo-activity-tracker.firebaseio.com',
});

const db = firebaseStore.getFirestore();
const activityTypesDb = db.collection('activity-types');

activityTypesDb.get().then((x) => x.docs.map((y) => console.log(y.data())));

server.all('/activity/*', activities);

server.get('/', (_: Request, res: Response) => {
  res.send('Hello world!');
});

server.listen(port, () => {
  console.log(`Listening on port ${port}..`);
});
