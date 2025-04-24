import z from 'zod';
import { protectedProcedure, router } from '../init';
import { Competition } from '../../entities';

export const competitionsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = ctx.db;
    const competitions = await db.competitions.findAll();

    return competitions.length
      ? competitions.map((competition) => ({
          id: competition.id,
          name: competition.name,
          startDate: competition.startDate,
          endDate: competition.endDate,
        }))
      : [];
  }),
  get: protectedProcedure.input(z.string()).query(async ({ ctx, input: uuid }) => {
    const db = ctx.db;
    const competition = await db.competitions.findOne({ id: uuid}, { populate: ['teams', 'teams.teamMemberships', 'teams.teamMemberships.user', 'teams.teamMemberships.user.activities', 'teams.teamMemberships.user.activities.activityType'] });

    
    if (!competition) {
      throw new Error('Competition not found');
    }

    const teamsWithActivities = competition.teams.map(team => {
      const users = team.teamMemberships.map(({ user }) => user);
      const activitiesInCompetition = team.teamMemberships.map(({ user }) => 
        user.activities.filter(activity => activity.competition.id === competition.id)
      );

      const totalMinutes = activitiesInCompetition.reduce((teamAcc, userActivities) => 
        teamAcc + userActivities.reduce((userAcc, activity) => userAcc + activity.time, 0)
      , 0);

      return {
        id: team.id,
        name: team.name,
        members: users.map(user => ({
          id: user.id,
          name: user.name,
        })),
        totalUniqueActivities: [...new Set(
          activitiesInCompetition.flat().map(activity => activity.activityType.id)
        )].length,
        totalMinutes,
      };
    });

    return {
      id: competition.id,
      name: competition.name,
      startDate: competition.startDate,
      endDate: competition.endDate,
      teams: teamsWithActivities,
    };
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        startDate: z.string(),
        endDate: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = ctx.db;

      const competition = db.competitions.create({
        name: input.name,
        startDate: input.startDate,
        endDate: input.endDate,
      });
      await db.em.flush();

      return competition;
    }),
});
