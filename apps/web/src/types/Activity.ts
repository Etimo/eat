import { ActivityType } from './ActivityType';
import { BaseType } from './BaseType';
import { User } from './User';

export type Activity = {
  time: number;
  date: string;
  activityType: ActivityType;
  user: User;
} & BaseType;
