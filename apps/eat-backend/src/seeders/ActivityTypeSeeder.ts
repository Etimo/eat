import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ActivityType } from '../entities';

export class ActivityTypeSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(ActivityType, {
      name: 'Löpning',
    });
    em.create(ActivityType, {
      name: 'Klättring',
    });
    em.create(ActivityType, {
      name: 'Promenad',
    });
    em.create(ActivityType, {
      name: 'Gym',
    });
    em.create(ActivityType, {
      name: 'Simning',
    });
    em.create(ActivityType, {
      name: 'Discgolf',
    });
    em.create(ActivityType, {
      name: 'Cykling',
    });
    em.create(ActivityType, {
      name: 'Dans',
    });
  }
}
