import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Activity } from './Activity';

@Entity({ tableName: 'activity_types' })
export class ActivityType extends BaseEntity {
  @Property({ type: 'string' })
  name!: string;

  @OneToMany(() => Activity, (a) => a.activityType)
  activities = new Collection<Activity>(this);
}
