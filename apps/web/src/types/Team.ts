import { BaseType } from './BaseType';
import { User } from './User';

export type Team = {
  name: string;
  users: User[];
} & BaseType;
