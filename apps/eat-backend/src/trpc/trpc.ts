import { router } from './init';
import { teamsRouter } from './routers/teams-router';

export const serverRouter = router({
  teams: teamsRouter,
});
export type ServerRouter = typeof serverRouter;
