import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Competition } from '../entities';

export class CompetitionSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    context.competitions = [
      em.create(Competition, {
        name: 'Tävling inaktiv',
        startDate: new Date(Date.now() - 86400000 * 40).toISOString(),
        endDate: new Date(Date.now() - 86400000 * 10).toISOString(),
        isActive: false,
      }),
      em.create(Competition, {
        name: 'Tävling aktiv',
        startDate: new Date(Date.now() - 86400000 * 5).toISOString(),
        endDate: new Date(Date.now() + 86400000 * 25).toISOString(),
        isActive: true,
      }),
    ];
  }
}
