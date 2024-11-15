import { Card } from './Card';
import { BarGraph } from '../graphs';
import { trpc } from '@/trpc/server';

export const AllStandingsCard = async () => {
  const teams = await trpc.teams.list();
  // const teamActivities = await Promise.all(
  //   teams.map((team) => trpc.activities.byTeam(team.id)),
  // );

  const activityTimePerTeam = (id: string) => {
    const activities = teamActivities.find(
      ({ team }) => team === id,
    )?.activities;

    return activities
      ? activities.reduce((total, { time }) => total + time, 0)
      : 0;
  };

  const allStanding = teams.map(({ id, name }) => ({
    label: name,
    value: activityTimePerTeam(id),
  }));

  const total = allStanding.reduce((total, { value }) => total + value, 0);

  return (
    <Card title="All">
      <div className="flex justify-between gap-2.5">
        <BarGraph data={allStanding} />
      </div>
      <hr className="-mx-6 my-4 h-0.5 border-t-gradient-start" />
      <div className="flex justify-between">
        <div className="text-3xl font-semibold">Total</div>
        <div className="text-3xl font-semibold">{total} min</div>
      </div>
    </Card>
  );
};
AllStandingsCard.displayName = 'AllStandingsCard';
