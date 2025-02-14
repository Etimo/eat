import z from 'zod';
import { teamData } from '../../data';
import { protectedProcedure, router } from '../init';

export const teamsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = ctx.db;

    const teams = await teamData.list(db);
    if (!teams.length) {
      return [];
    }
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
});
