import dayjs from 'dayjs';
import { protectedProcedure, router } from '../init';
import z from 'zod';

export const activityTypesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const activityTypes = await ctx.db.activityTypes.findAll();

    return activityTypes.map((activityType) => ({
      id: activityType.id,
      name: activityType.name,
    }));
  }),
  create: protectedProcedure.input(
    z.object({
      name: z.string(),
    }),
  ).mutation(async ({ ctx, input}) => {
    const { name } = input;
    const activityType = ctx.db.activityTypes.create({
      name,
    });

    await ctx.db.em.flush();

    return {
      id: activityType.id,
      name: activityType.name,
    };
  }),
});
