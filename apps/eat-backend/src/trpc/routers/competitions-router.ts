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
