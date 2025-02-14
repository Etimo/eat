import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { User } from './User';
import { Team } from './Team';

@Entity({ tableName: 'team_memberships' })
export class TeamMembership extends BaseEntity {
  @ManyToOne(() => Team, { nullable: false })
  team!: Team;

  @ManyToOne(() => User, { nullable: false })
  user!: User;
}
