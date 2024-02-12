import { Team } from './Team';

export type User = {
  id: string;
  name: string;
  teamId: string;
  team: Team;
};
