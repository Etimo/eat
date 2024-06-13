import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Team, TeamMembership, User } from '../entities';

export class TeamMembershipSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    (context.users as User[]).map((user, index) => {
      const team = (context.teams as Team[])[index % 5];
      em.create(TeamMembership, {
        user,
        team,
        memberFrom: new Date().toISOString(),
      });
    });
  }
}
