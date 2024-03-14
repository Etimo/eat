import { Team } from './Team';
import { Activity } from './Activity';
import { BaseType } from './BaseType';

export type User = {
  name: string;
  team?: Team;
  activities: Activity[];
} & BaseType;
