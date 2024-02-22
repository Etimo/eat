import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity({ tableName: 'activity_types' })
export class ActivityType extends BaseEntity {
  @Property({ type: 'string' })
  name!: string;
}
