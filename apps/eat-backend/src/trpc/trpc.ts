import { router } from './init';
import { activitesRouter } from './routers/activities-router';
import { competitionsRouter } from './routers/competitions-router';
import { teamsRouter } from './routers/teams-router';

export const serverRouter = router({
  activities: activitesRouter,
  competitions: competitionsRouter,
  teams: teamsRouter,
});
export type ServerRouter = typeof serverRouter;
