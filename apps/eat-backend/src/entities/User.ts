import {
  Collection,
  Entity,
  ManyToMany,
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

  @ManyToOne(() => Team, { nullable: true })
  team?: Team;

  @ManyToMany({ entity: 'Team', mappedBy: 'users' })
  previousTeams = new Collection<Team>(this);

  @OneToMany(() => Activity, (a) => a.user)
  activities = new Collection<Activity>(this);
}
