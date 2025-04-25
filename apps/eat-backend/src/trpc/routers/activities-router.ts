import dayjs from 'dayjs';
import z from 'zod';
import { protectedProcedure, router } from '../init';

export const activitesRouter = router({
  list: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: competitionId }) => {
      const activities = await ctx.db.activities.find(
        { competition: { id: competitionId } },
        {
          populate: [
            'activityType',
            'user',
            'user.teamMemberships',
            'user.teamMemberships.team',
          ],
        },
      );

      return activities.map((activity) => ({
        id: activity.id,
        name: activity.user.name,
        teamName: activity.user.teamMemberships.find(
          (teamMembership) =>
            teamMembership.team.competition?.id === activity.competition.id,
        )?.team.name,
        date: activity.date,
        time: activity.time,
        activityType: activity.activityType.name,
      }));
    }),

  dashboard: router({
    today: protectedProcedure.query(async ({ ctx: { db, currentUser } }) => {
      const userActivities = await db.activities.find(
        {
          user: { id: currentUser.id },
          date: { $gte: dayjs().format('YYYY-MM-DD') },
        },
        { populate: ['user'] },
      );

      const teamMembership = await db.teamMemberships.findOne(
        { user: { id: currentUser.id } },
        {
          populate: [
            'team',
          ],
        },
      );
      if (!teamMembership) {
        throw new Error('Team not found');
      }

      const teamActivities = await db.activities.find(
        {
          user: { teamMemberships: { team: { id: teamMembership.team.id } } },
          date: { $gte: dayjs().format('YYYY-MM-DD') },
        },
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

      const teamMembership = await db.teamMemberships.findOne(
        { user: { id: currentUser.id } },
        {
          populate: [
            'team',
          ],
        },
      );
      if (!teamMembership) {
        throw new Error('Team not found');
      }

      const teamActivities = await db.activities.find(
        {
          user: { teamMemberships: { team: { id: teamMembership.team.id } } },
        },
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
        activityType: z.string(),
        date: z.string(),
        minutes: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = ctx.db;
      const user = ctx.currentUser;
      const currentCompetition = ctx.currentCompetition;

      if (!currentCompetition) {
        throw new Error('No active competition found');
      }

      const activity = db.activities.create({
        activityType: input.activityType,
        date: input.date,
        time: input.minutes,
        competition: currentCompetition.id,
        user: user.id,
      });
      await db.em.flush();

      return activity;
    }),
});
