import z from 'zod';
import { teamData } from '../../data';
import { protectedProcedure, router } from '../init';
import dayjs from 'dayjs';

export const teamsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = ctx.db;

    const teams = await db.teams.findAll({
      populate: ['teamMemberships', 'teamMemberships.user'],
      orderBy: {
        name: 'ASC',
      }
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
  listActive: protectedProcedure.query(async ({ ctx }) => {
    const db = ctx.db;
    const currentUser = ctx.currentUser;

    const teams = await db.teams.findAll({
      where: {
        competition: {
          startDate: {
            $lte: dayjs().format('YYYY-MM-DD'),
          },
          endDate: {
            $gte: dayjs().format('YYYY-MM-DD'),
          }
        }
      },
      populate: ['teamMemberships', 'teamMemberships.user', 'competition'],
      orderBy: {
        name: 'ASC',
      }
    });

    const activites = await db.activities.findAll({
      where: {
        user: { teamMemberships: { team: { id: teams.map((team) => team.id) } } },
        competition: teams[0].competition
      }
    })
    const stats = activites.reduce((acc, activity) => {
      const team = teams.find((team) => team.id === team.teamMemberships.find(
        (teamMembership) => teamMembership.user.id === activity.user.id,
      )?.team.id);
      if (!team) return acc;
      if (!acc[team.id]) {
        acc[team.id] = {
          activities: new Set(),
          minutes: 0,
        };
      }
      acc[team.id].activities.add(activity.activityType.id);
      acc[team.id].minutes += activity.time;
      return acc
    }, {} as Record<string, {minutes: number, activities: Set<string>}>);

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

      const { id, name, teamMemberships } = await teamData.getById(db, uuid);
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
});
