import dayjs from 'dayjs';
import z from 'zod';
import { protectedProcedure, router } from '../init';

export const activitesRouter = router({
  dashboard: router({
    today: protectedProcedure.query(async ({ ctx: { db, currentUser } }) => {
      const userActivities = await db.activities.find(
        {
          user: { id: currentUser.id },
          date: { $gte: dayjs().format('YYYY-MM-DD') },
        },
        { populate: ['user'] },
      );

      const teamActivities = await db.activities.find(
        { user: { teamMemberships: { user: { id: currentUser.id } } } },
        {
          populate: [
            'activityType',
            'user',
            'user.teamMemberships',
            'user.teamMemberships.team',
          ],
        },
      );

      return {
        user: userActivities.reduce(
          (total, activity) => total + activity.time,
          0,
        ),
        team: teamActivities.reduce(
          (total, activity) => total + activity.time,
          0,
        ),
      };
    }),
    total: protectedProcedure.query(async ({ ctx: { db, currentUser } }) => {
      const userActivities = await db.activities.find(
        {
          user: { id: currentUser.id },
        },
        { populate: ['user'] },
      );

      const teamActivities = await db.activities.find(
        { user: { teamMemberships: { user: { id: currentUser.id } } } },
        {
          populate: [
            'activityType',
            'user',
            'user.teamMemberships',
            'user.teamMemberships.team',
          ],
        },
      );

      return {
        user: userActivities.reduce(
          (total, activity) => total + activity.time,
          0,
        ),
        team: teamActivities.reduce(
          (total, activity) => total + activity.time,
          0,
        ),
      };
    }),
  }),
  create: protectedProcedure
      .input(
        z.object({
          activityType : z.string(),
          date: z.string(),
          minutes: z.number()          
        }),
      )
      .mutation(async ({ ctx, input }) => {
        const db = ctx.db;
  
        const activity = db.activities.create({
          activityType: input.activityType,
          date: input.date,
          time: input.minutes,
          competition: "",
          user: ""
        });
        await db.em.flush();
  
        return activity;
      }),
});
