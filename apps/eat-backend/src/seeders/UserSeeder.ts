import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../entities';
import { UserFactory } from '../entities/factories';

export class UserSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    context.users = [
      ...new UserFactory(em)
        .each((user) => {
          user.team = context.teams[0];
        })
        .make(4)
        .map((user) => em.create(User, user)),
      ...new UserFactory(em)
        .each((user) => {
          user.team = context.teams[1];
        })
        .make(4)
        .map((user) => em.create(User, user)),
      ...new UserFactory(em)
        .each((user) => {
          user.team = context.teams[2];
        })
        .make(4)
        .map((user) => em.create(User, user)),
      ...new UserFactory(em)
        .each((user) => {
          user.team = context.teams[3];
        })
        .make(4)
        .map((user) => em.create(User, user)),
    ];
  }
}
