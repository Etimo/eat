import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../entities';
import { UserFactory } from '../entities/factories';

export class UserSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    context.users = [
      ...new UserFactory(em).make(16).map((user) => em.create(User, user)),
    ];
  }
}
