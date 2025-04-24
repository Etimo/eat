import { TeamActivityCard } from '@/components/team-activity-card';
import { trpc } from '@/trpc';

export const TeamsPage = () => {
  const query = trpc.teams.listActive.useQuery();

  return (
    <div className="flex flex-col gap-2 px-4 pb-10">
      {(query.data ?? []).map((team) => (
        <TeamActivityCard key={team.id} team={team} />
      ))}
    </div>
  );
};
