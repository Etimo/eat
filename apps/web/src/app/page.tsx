import {
  ActivityCard,
  AllStandingsCard,
  TeamStandingsCard,
} from '@/components/card';
import { RecentActivities } from '@/components/history';
import { trpc } from '@/trpc/server';

export default async function Home() {
  const teams = await trpc.teams.list();
  console.log('teams', teams);

  return (
    <main className="flex flex-col gap-5 px-4 pb-10">
      <h1 className="text-4xl font-semibold mt-4">Summary</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* <ActivityCard />
        <RecentActivities />
        <TeamStandingsCard />
        <AllStandingsCard /> */}
      </div>
    </main>
  );
}
