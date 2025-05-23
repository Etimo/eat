import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Activity } from './Activity';
import { TeamMembership } from './TeamMembership';

@Entity({ tableName: 'users' })
export class User extends BaseEntity {
  @Property()
  name!: string;

  @Property({ unique: true, nullable: false })
  email!: string;

  @Property({ nullable: false })
  picture!: string;

  @Property({ nullable: false, default: 'member' })
  role!: string;

  @OneToMany(() => TeamMembership, (tm) => tm.user, { nullable: true })
  teamMemberships = new Collection<TeamMembership>(this);

  @OneToMany(() => Activity, (a) => a.user)
  activities = new Collection<Activity>(this);
}
