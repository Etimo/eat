// import { protectedProcedure, router } from '../init';

// export const activitesRouter = router({
//   dashboard: router({
//     today: protectedProcedure.query(async ({ ctx: { db, currentUserId } }) => {
//       const userActivities = await db.activities.find(
//         { user: { id: currentUserId } },
//         { populate: ['user'] },
//       );

//       const teamActivities = await db.activities.find(
//         { user: { teamMemberships: { user: { id: currentUserId } } } },
//         {
//           populate: [
//             'activityType',
//             'user',
//             'user.teamMemberships',
//             'user.teamMemberships.team',
//           ],
//         },
//       );

//       return {
//         user: userActivities.reduce(
//           (total, activity) => total + activity.time,
//           0,
//         ),
//         team: teamActivities.reduce(
//           (total, activity) => total + activity.time,
//           0,
//         ),
//       };
//     }),
//   }),
// });
