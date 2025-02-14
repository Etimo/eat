import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {
  Activity,
  ActivityType,
  Team,
  TeamMembership,
  User,
} from '../entities';
import { TeamFactory, UserFactory } from '../entities/factories';
import dayjs from 'dayjs';

export class TestSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const activityTypes = ['Löpning', 'Klättring', 'Promenad'].map((name) =>
      em.create(ActivityType, {
        name,
      }),
    );

    const teams: Team[] = new TeamFactory(em).make(3);
    const users: User[] = new UserFactory(em).make(12);

    const teamMemberships: TeamMembership[] = Array.from({ length: 8 }).map(
      (_, index) => {
        return em.create(TeamMembership, {
          user: users[index],
          team: teams[index % 2],
        });
      },
    );
  }
}
