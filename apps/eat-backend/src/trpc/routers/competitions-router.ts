import z from 'zod';
import { protectedProcedure, router } from '../init';
import { Competition } from '../../entities';
import { randomUUID } from 'crypto';

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
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        teams: z.number().min(1).max(100),
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

      // Create placeholder teams
      const teams = Array.from({ length: input.teams }, (_, i) => db.teams.create({
        name: `${input.name} - Team ${i + 1}`,
        competition,
      }));

      const users = await db.users.findAll();
      users.sort(() => Math.random() - 0.5); // Shuffle users
      for(let index = 0; index < users.length; index++) {
        const user = users[index];
        const teamIndex = index % input.teams;
        const team = teams[teamIndex];

        db.teamMemberships.create({
          team,
          user,
        });
      }
      await db.em.flush();

      return competition;
    }),
});
