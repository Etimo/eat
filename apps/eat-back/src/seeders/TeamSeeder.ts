import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Team } from '../entities';

export class TeamSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Team, {
      name: 'v17 enjoyers',
    });
    em.create(Team, {
      name: 'Lorem Ipsum',
    });
    em.create(Team, {
      name: 'Padél pack',
    });
    em.create(Team, {
      name: 'Ctrl+Alt+Elite',
    });
    em.create(Team, {
      name: 'Erik, Björn, Johan och Julius',
    });
  }
}
