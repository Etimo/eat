import { ActivityTypeSeeder } from './ActivityTypeSeeder';
import { Seeder } from '@mikro-orm/seeder';
import { TeamSeeder } from './TeamSeeder';
import { UserSeeder } from './UserSeeder';
import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { CompetitionSeeder } from './CompetitionSeeder';
import { ActivitySeeder } from './ActivitySeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [
      CompetitionSeeder,
      ActivityTypeSeeder,
      TeamSeeder,
      UserSeeder,
      ActivitySeeder
    ]);
  }
}
