import { ActivityCard } from '@/components/card';

export default async function Home() {
  return (
    <main className="flex flex-col gap-5 px-4 pb-10">
      <h1 className="text-4xl font-semibold mt-4">Översikt</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ActivityCard />
        {/* <RecentActivities />
        <TeamStandingsCard />
        <AllStandingsCard /> */}
      </div>
    </main>
  );
}
