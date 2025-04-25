import z from 'zod';
import { protectedProcedure, router } from '../init';

export const activityTypesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const activityTypes = await ctx.db.activityTypes.findAll();

    return activityTypes.map(({ name, id }) => ({ name, id }));
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
