import z from 'zod';
import { teamData } from '../../data';
import { protectedProcedure, router } from '../init';
import { create } from 'domain';

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
