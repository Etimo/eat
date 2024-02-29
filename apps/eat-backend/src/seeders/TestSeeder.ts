import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Activity, ActivityType, Team, User } from '../entities';
import { TeamFactory, UserFactory } from '../entities/factories';
import dayjs from 'dayjs';

export class TestSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const activityTypes = ['Löpning', 'Klättring', 'Promenad'].map((name) =>
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
      .make(4)
      .map((user) => em.create(User, user));

    const usersNoTeam: User[] = new UserFactory(em)
      .make(4)
      .map((user) => em.create(User, user));

    Array.from({ length: 6 }).map((_, index) => {
      em.create(Activity, {
        activityType: activityTypes[index % activityTypes.length],
        user: usersNoTeam[index % usersNoTeam.length],
        time: 30 * (index + 1),
        date: dayjs('2024-02-28').add(index, 'day').format('YYYY-MM-DD'),
      });
    });

    Array.from({ length: 6 }).map((_, index) => {
      em.create(Activity, {
        activityType: activityTypes[index % activityTypes.length],
        user: usersTeamTwo[index % usersTeamTwo.length],
        time: 30 * (index + 1),
        date: dayjs('2024-02-28').add(index, 'day').format('YYYY-MM-DD'),
      });
    });
  }
}
