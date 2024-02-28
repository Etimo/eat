import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Activity } from '../entities';
import dayjs from 'dayjs';

export class ActivitySeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    Array.from({ length: 20 }).map((_, index) => {
      em.create(Activity, {
        time: +(Math.random() * 20 * (index + 1)).toFixed(0),
        activityType:
          context.activityTypes[index % context.activityTypes.length],
        date: dayjs('2024-02-28')
          .add(3 % (index + 1), 'day')
          .format('YYYY-MM-DD'),
        user: context.users[index % context.users.length],
      });
    });
  }
}
