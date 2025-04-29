import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Team, TeamMembership } from '../entities';

export class TeamMembershipSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    context.users.forEach((user: any, index: number) => {
      const team = context.teams[index % context.teams.length];
      em.create(TeamMembership, {
        user,
        team,
      })
    })
  }
}
