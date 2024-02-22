import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity({ tableName: 'activities' })
export class Activity extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  time!: number;

  @Property()
  date!: string;
}
