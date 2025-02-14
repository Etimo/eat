import { CompetitionActivityCard } from '@/components/competition-activity-card';
import { TodaysActivityCard } from '@/components/todays-activity-card';

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-2 px-4 pb-10">
      <h1 className="text-3xl font-semibold mt-4">Översikt</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TodaysActivityCard />
        <CompetitionActivityCard />
      </div>
    </div>
  );
};
