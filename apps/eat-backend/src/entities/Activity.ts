import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { ActivityType } from './ActivityType';
import { User } from './User';
import { Competition } from './Competition';

@Entity({ tableName: 'activities' })
export class Activity extends BaseEntity {
  @Property()
  time!: number;

  @Property()
  date!: string;

  @ManyToOne(() => ActivityType)
  activityType!: ActivityType;

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Competition)
  competition!: Competition;
}
