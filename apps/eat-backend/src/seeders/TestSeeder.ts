import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { ActivityType, Team, User } from '../entities';
import { TeamFactory, UserFactory } from '../entities/factories';

export class TestSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    ['Löpning', 'Klättring', 'Promenad'].map((name) =>
      em.create(ActivityType, {
        name,
      }),
    );

    const teamOne = em.create(Team, new TeamFactory(em).makeOne());
    const usersTeamOne: User[] = new UserFactory(em)
      .each((user) => {
        user.team = teamOne;
      })
      .make(4);
    usersTeamOne.map((user) => em.create(User, user));

    const teamTwo = em.create(Team, new TeamFactory(em).makeOne());
    const usersTeamTwo: User[] = new UserFactory(em)
      .each((user) => {
        user.team = teamTwo;
      })
      .make(4);
    usersTeamTwo.map((user) => em.create(User, user));

    const usersNoTeam: User[] = new UserFactory(em).make(4);
    usersNoTeam.map((user) => em.create(User, user));
  }
}
