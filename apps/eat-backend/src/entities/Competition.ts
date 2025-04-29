import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Activity, Team } from '.';

@Entity({ tableName: 'competitions' })
export class Competition extends BaseEntity {
  @Property({ type: 'string' })
  name!: string;

  @Property({ type: 'string' })
  startDate!: string;

  @Property({ type: 'string' })
  endDate!: string;

  @Property({ type: 'boolean', default: false })
  isActive!: boolean;

  @OneToMany(() => Team, (t) => t.competition)
  teams = new Collection<Team>(this);

  @OneToMany(() => Activity, (a) => a.competition)
  activities = new Collection<Activity>(this);
}
