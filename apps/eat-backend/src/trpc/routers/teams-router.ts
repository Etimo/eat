import z from 'zod';
import { protectedProcedure, router } from '../init';

export const teamsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = ctx.db;

    const teams = await db.teams.findAll({
      populate: ['teamMemberships', 'teamMemberships.user'],
      orderBy: {
        name: 'ASC',
      },
    });

    return teams.map(({ id, name, teamMemberships }) => ({
      id,
      name,
      users: teamMemberships.map(({ user }) => ({
        id: user.id,
        name: user.name,
      })),
    }));
  }),
  get: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input: uuid }) => {
      const db = ctx.db;

      const { id, name, teamMemberships } = await db.teams.findOneOrFail(
        { id: uuid },
        {
          populate: ['teamMemberships', 'teamMemberships.user'],
        },
      );

      return {
        id,
        name,
        users: teamMemberships.map(({ user }) => ({
          id: user.id,
          name: user.name,
        })),
      };
    }),
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const db = ctx.db;

      const team = db.teams.create({
        name: input.name,
      });
      await db.em.flush();

      return team;
    }),
  leaderboard: protectedProcedure.query(async ({ ctx }) => {
    const db = ctx.db;

    const competitions = await db.competitions.findAll();

    const currentCompetition = competitions.find((competition) => {
      const startDate = new Date(competition.startDate);
      const endDate = new Date(competition.endDate);
      const now = new Date();
      return startDate <= now && endDate >= now;
    });
    if (!currentCompetition) {
      return [];
    }

    const teams = await db.teams.findAll({
      where: {
        competition: { id: currentCompetition.id },
      },
      populate: [
        'teamMemberships',
        'teamMemberships.user',
        'teamMemberships.user.activities',
      ],
    });

    const teamsWithActivities = teams.map((team) => {
      const users = team.teamMemberships.map(({ user }) => user);
      const activitiesInCompetition = team.teamMemberships.map(({ user }) =>
        user.activities.filter(
          (activity) => activity.competition.id === currentCompetition.id,
        ),
      );

      const totalMinutes = activitiesInCompetition.reduce(
        (teamAcc, userActivities) =>
          teamAcc +
          userActivities.reduce(
            (userAcc, activity) => userAcc + activity.time,
            0,
          ),
        0,
      );

      return {
        id: team.id,
        name: team.name,
        members: users.map((user) => ({
          id: user.id,
          name: user.name,
        })),
        totalUniqueActivities: [
          ...new Set(
            activitiesInCompetition
              .flat()
              .map((activity) => activity.activityType.id),
          ),
        ].length,
        totalMinutes,
      };
    });
    return teamsWithActivities.sort((a, b) => b.totalMinutes - a.totalMinutes);
  }),
});
