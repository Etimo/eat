import express, { Express, Request, Response } from 'express';
import { activityTypeList, activityTypeData } from '../data';

export const activityTypes = express.Router();

activityTypes.get('/activitytype', async(_, res) => {
  const activityTypes = await activityTypeList();
  res.json(activityTypes);
});
activityTypes.get('/activitytype/:id', async (req, res) => {
  const activityType = await activityTypeData(req.params.id);
  res.json(activityType);
});
activityTypes.post('/activitytype', (_, res) => {
  res.send('Create activity');
});
