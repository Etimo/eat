import { ActivityTypeSeeder } from './ActivityTypeSeeder';
import { Seeder } from '@mikro-orm/seeder';
import { TeamSeeder } from './TeamSeeder';
import { UserSeeder } from './UserSeeder';
import type { EntityManager } from '@mikro-orm/core';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    this.call(em, [ActivityTypeSeeder, TeamSeeder]);
  }
}
