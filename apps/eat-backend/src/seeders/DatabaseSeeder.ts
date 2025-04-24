import { ActivityTypeSeeder } from './ActivityTypeSeeder';
import { Seeder } from '@mikro-orm/seeder';
import { TeamSeeder } from './TeamSeeder';
import { UserSeeder } from './UserSeeder';
import type { EntityManager } from '@mikro-orm/core';
import { CompetitionSeeder } from './CompetitionSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    this.call(em, [
      CompetitionSeeder,
      ActivityTypeSeeder,
      TeamSeeder,
      UserSeeder,
    ]);
  }
}
