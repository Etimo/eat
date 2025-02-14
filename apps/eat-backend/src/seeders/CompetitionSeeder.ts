import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Competition } from '../entities';

export class CompetitionSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(Competition, {
      name: 'Det är jag som är Mango',
      startDate: '2025-01-01',
      endDate: '2026-01-01',
    });
  }
}
