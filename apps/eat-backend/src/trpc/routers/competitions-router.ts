import z from 'zod';
import { protectedProcedure, router } from '../init';

export const competitionsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const db = ctx.db;
    const competitions = await db.competitions.findAll();

    console.log(competitions);

    return competitions.length
      ? competitions.map((competition) => ({
          id: competition.id,
          startDate: competition.startDate,
          endDate: competition.endDate,
        }))
      : [];
  }),
  create: protectedProcedure
    .input(
      z.object({
        startDate: z.string(),
        endDate: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = ctx.db;
    }),
});
