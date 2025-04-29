import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ActivitySeeder } from './ActivitySeeder';
import { ActivityTypeSeeder } from './ActivityTypeSeeder';
import { CompetitionSeeder } from './CompetitionSeeder';
import { TeamMembershipSeeder } from './TeamMembershipSeeder';
import { TeamSeeder } from './TeamSeeder';
import { UserSeeder } from './UserSeeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [
      CompetitionSeeder,
      ActivityTypeSeeder,
      TeamSeeder,
      UserSeeder,
      ActivitySeeder,
      TeamMembershipSeeder,
    ]);
  }
}
