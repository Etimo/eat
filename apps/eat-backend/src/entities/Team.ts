import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Competition } from './Competition';
import { TeamMembership } from './TeamMembership';

@Entity({ tableName: 'teams' })
export class Team extends BaseEntity {
  @Property()
  name!: string;

  @OneToMany(() => TeamMembership, (tm) => tm.team, { nullable: true })
  teamMemberships = new Collection<TeamMembership>(this);

  @ManyToOne(() => Competition, { nullable: true })
  competition?: Competition;
}
