import { teamData } from '../../data';
import { procedure, protectedProcedure, router } from '../init';

export const teamsRouter = router({
  list: protectedProcedure.query(async (x) => {
    console.log('ctx backend', x.ctx);
    // const teams = await teamData.list();
    // if (!teams.length) {
    //   return [];
    // }
    // return teams.map(({ id, name, teamMemberships }) => ({
    //   id,
    //   name,
    //   users: teamMemberships.map(({ user }) => ({
    //     id: user.id,
    //     name: user.name,
    //   })),
    // }));
    return { message: 'Hello world!' };
  }),
});
