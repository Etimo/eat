import { protectedProcedure, router } from '../init';

export const activityTypesRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const activityTypes = await ctx.db.activityTypes.findAll();

    return activityTypes.map(({ name, id }) => ({ name, id }));
  }),
});
