import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Team } from './Team';
import { Activity } from './Activity';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property()
  name!: string;

  @ManyToOne(() => Team)
  team?: Team;

  @OneToMany(() => Activity, (a) => a.user)
  activity = new Collection<Activity>(this);
}
