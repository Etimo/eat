import { procedure, router } from '../init';
import { createServerTrpc } from '../trpc';

export const activitiesRouter = router({
  dashboard: router({
    today: procedure.query(async ({ ctx }) => {
      const trpc = createServerTrpc(ctx.token);
      return trpc.activities.dashboard.today.query();
    }),
  }),
});
