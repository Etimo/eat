import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Team } from '../entities';

export class TeamSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    context.teams = [
      'v17 enjoyers',
      'Lorem Ipsum',
      'Padél pack',
      'Ctrl+Alt+Elite',
      'Erik, Björn, Johan och Julius',
    ].map((name) =>
      em.create(Team, {
        name,
      }),
    );
  }
}
