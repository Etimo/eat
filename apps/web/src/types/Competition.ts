import { BaseType } from './BaseType';
import { Team } from './Team';

export type Competition = {
  startDate: string;
  endDate: string;
  teams: Team[];
} & BaseType;
