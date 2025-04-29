import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Team } from '../entities';

export class TeamSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    context.teams = [
      'Team 0',
      'Team 1',
      'Team 2',
      'Team 3',
      'Team 4',
    ].map((name) =>
      em.create(Team, {
        name,
        competition: context.competitions[1],
      }),
    );
  }
}
