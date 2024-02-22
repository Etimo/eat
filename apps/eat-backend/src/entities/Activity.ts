import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { ActivityType } from './ActivityType';
import { User } from './User';

@Entity({ tableName: 'activities' })
export class Activity extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  time!: number;

  @Property()
  date!: string;

  @ManyToOne(() => ActivityType)
  activityType?: ActivityType;

  @ManyToOne(() => User)
  user?: User;
}
