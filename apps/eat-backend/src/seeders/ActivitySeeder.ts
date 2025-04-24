import type { Dictionary, EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Activity, User } from '../entities';

export class ActivitySeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    let counter = 0;
    context.activities = context.users.flatMap((user: any, index: number) => {
      const res = new Array(index + 10).fill(0).map(() => {
        counter++;
        return em.create(Activity, {
          activityType:
            context.activityTypes[counter % context.activityTypes.length],
          competition:
            context.competitions[counter % context.competitions.length],
          user,
          date: new Date(
            Date.now() - 86400000 * ((index + counter) % 3),
          ).toISOString(),
          time: (1 + ((counter + index) % 6)) * 10,
        });
      });
      return res;
    });
  }
}
