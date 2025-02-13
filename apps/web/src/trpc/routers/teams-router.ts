import { procedure, router } from '../init';
import { createServerTrpc } from '../trpc';

export const teamsRouter = router({
  list: procedure.query(async ({ ctx }) => {
    const trpc = createServerTrpc(ctx?.token);
    return trpc.teams.list.query();
  }),
});
