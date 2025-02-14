import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../entities';
import { v4 as uuidv4 } from 'uuid';

export class UserSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const users: { name: string; email: string }[] = [
      {
        name: `André Hansson`,
        email: `andre.hansson@etimo.se`.toLowerCase(),
      },
      {
        name: `Björn Wahlberg`,
        email: `bjorn.wahlberg@etimo.se`.toLowerCase(),
      },
      {
        name: `Daniel Winther`,
        email: `daniel.winther@etimo.se`.toLowerCase(),
      },
      {
        name: `Erik Malm`,
        email: `erik.malm@etimo.se`.toLowerCase(),
      },
      {
        name: `Henrik Westöö`,
        email: `henrik.westoo@etimo.se`.toLowerCase(),
      },
      {
        name: `Jeanette Britan`,
        email: `jeanette.britan@etimo.se`.toLowerCase(),
      },
      {
        name: `Joakim Olesen`,
        email: `joakim.olesen@etimo.se`.toLowerCase(),
      },
      {
        name: `Johan Hazelius`,
        email: `johan.hazelius@etimo.se`.toLowerCase(),
      },
      {
        name: `Malin Lindbom`,
        email: `malin.lindbom@etimo.se`.toLowerCase(),
      },
      {
        name: `Malin Wadholm`,
        email: `malin.wadholm@etimo.se`.toLowerCase(),
      },
      {
        name: `Morgan Cromell`,
        email: `morgan.cromell@etimo.se`.toLowerCase(),
      },
      {
        name: `Philip Forsberg`,
        email: `philip.forsberg@etimo.se`.toLowerCase(),
      },
      {
        name: `Saga Swahn`,
        email: `saga.swahn@etimo.se`.toLowerCase(),
      },
    ];
    var promises = users.map((u) => this.createUserIfNotExists(em, u));
    await Promise.all(promises);
  }

  async createUserIfNotExists(
    em: EntityManager,
    user: { name: string; email: string },
  ): Promise<void> {
    const existingUser = await em.findOne(User, { email: user.email });
    if (!existingUser) {
      em.create(User, {
        name: user.name,
        email: user.email,
        picture: 'https://i.imgur.com/hE5XaTq.png',
        role: 'member',
      });
    }
  }
}
