import express, { Express, Request, Response } from 'express';
import * as firebaseStore from 'firebase-admin/firestore';

export const activities = express.Router();

const DATABASE = firebaseStore.getFirestore();
const activityTypesDb = DATABASE.collection('activity-types');

activityTypesDb.get().then((x) => x.docs.map((y) => console.log(y.data())));

activities.get('/activity', (_, res) => {
  res.send('Activites: []');
});
activities.get('/activity/:id', (req, res) => {
  res.send('activity ' + req.params.id);
});
activities.post('/activity', (_, res) => {
  res.send('Create activity');
});
