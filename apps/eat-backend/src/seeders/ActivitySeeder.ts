import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Activity, User } from '../entities';

export class ActivitySeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    let counter = 0;
    context.activities = context.users.flatMap((user: any, index: number) => {
      const res = new Array(index + 1).fill(0).map(() => ([
        em.create(Activity, {
          activityType:
            context.activityTypes[counter % context.activityTypes.length],
          competition:
            context.competitions[counter % context.competitions.length],
          user,
          date: new Date(Date.now() - 86400000 * (index)).toISOString(),
          time: (counter + 1) * 10,
        }),
      ]));
      counter++
      return res
    });
  }
}
