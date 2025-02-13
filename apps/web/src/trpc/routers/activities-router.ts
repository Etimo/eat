import { z } from 'zod';
import { procedure, router } from '../init';
import { getActivitiesByTeam } from '@/server/activity';

export const activitiesRouter = router({
  byTeam: procedure.input(z.string()).query(async ({ input: id }) => {
    return getActivitiesByTeam(id);
  }),
});
