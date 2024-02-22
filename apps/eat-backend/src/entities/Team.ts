import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity({ tableName: 'teams' })
export class Team extends BaseEntity {
  @Property()
  name!: string;

  @OneToMany(() => User, (u) => u.team)
  users = new Collection<User>(this);
}
