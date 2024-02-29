import { ActivityType } from "./ActivityType";
import { User } from "./User";

export type Activity = {
  id: string;
  user: User;
  type: ActivityType;
  time: number;
  date: string;
};