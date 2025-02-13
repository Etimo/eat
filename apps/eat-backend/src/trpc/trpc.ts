import { router } from './init';
import { activitesRouter } from './routers/activities-router';
import { teamsRouter } from './routers/teams-router';

export const serverRouter = router({
  activities: activitesRouter,
  teams: teamsRouter,
});
export type ServerRouter = typeof serverRouter;
