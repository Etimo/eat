import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { User } from './User';
import { Competition } from './Competition';

@Entity({ tableName: 'teams' })
export class Team extends BaseEntity {
  @Property()
  name!: string;

  @ManyToMany('User')
  users = new Collection<User>(this);

  @ManyToOne(() => Competition, { nullable: true })
  competition?: Competition;
}
