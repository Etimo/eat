import z from 'zod';
import { protectedProcedure, router } from '../init';
import { Competition } from 'src/entities';

export const teamsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = ctx.db;

    const teams = await db.teams.findAll({
      populate: ['teamMemberships', 'teamMemberships.user', 'competition'],
      orderBy: {
        name: 'ASC',
      },
    });

    return teams.map(({ id, name, teamMemberships, competition }) => ({
      id,
      name,
      users: teamMemberships.map(({ user }) => ({
        id: user.id,
        name: user.name,
      })),
      competition: { id: competition?.id, name: competition?.name },
    }));
  }),
  listActive: protectedProcedure.query(async ({ ctx }) => {
    const db = ctx.db;
    const currentUser = ctx.currentUser;

    const competition = await db.competitions.findOne({
      isActive: true,
    });

    const teams = await db.teams.findAll({
      where: {
        competition: {
          isActive: true,
        },
      },
      populate: ['teamMemberships', 'teamMemberships.user', 'competition'],
      orderBy: {
        name: 'ASC',
      },
    });

    const activites = await db.activities.findAll({
      where: {
        user: {
          teamMemberships: { team: { id: teams.map((team) => team.id) } },
        },
        competition: { id: competition?.id },
      },
      populate: ['*'],
    });
    const stats = activites.reduce(
      (acc, activity) => {
        const team = teams.find(
          (team) =>
            team.id ===
            team.teamMemberships.find(
              (teamMembership) => teamMembership.user.id === activity.user.id,
            )?.team.id,
        );
        if (!team) return acc;
        if (!acc[team.id]) {
          acc[team.id] = {
            activities: new Set(),
            minutes: 0,
          };
        }
        acc[team.id].activities.add(activity.activityType.id);
        acc[team.id].minutes += activity.time;
        return acc;
      },
      {} as Record<string, { minutes: number; activities: Set<string> }>,
    );

    return teams.map(({ id, name, teamMemberships }) => ({
      id,
      name,
      minutes: stats[id]?.minutes ?? 0,
      activities: stats[id]?.activities.size ?? 0,
      users: teamMemberships.map(({ user }) => ({
        id: user.id,
        name: user.name,
        isCurrentUser: user.id === currentUser.id,
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
  getCurrentUserTeam: protectedProcedure.query(async ({ ctx }) => {
    const db = ctx.db;
    const currentUser = ctx.currentUser;

    const { id, name, teamMemberships } = await db.teams.findOneOrFail(
      { teamMemberships: { user: { id: currentUser.id } } },
      {
        populate: ['teamMemberships', 'teamMemberships.user'],
      },
    );

    return {
      id,
      name,
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

  update: protectedProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const db = ctx.db;

      const existingTeam = await db.teams.findOne({ id: input.id });
      if (!existingTeam) {
        throw new Error('Team not found');
      }
      // If team exists, just update the name and updated_at
      existingTeam.name = input.name;
      existingTeam.updatedAt = new Date().toISOString();
      await db.em.flush();
      return existingTeam;
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
