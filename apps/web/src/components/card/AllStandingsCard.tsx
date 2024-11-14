import { FC } from 'react';
import { Card } from './Card';
import { getActivitiesByTeam } from '@/server/activity';
import { getTeams } from '@/server/team';
import { BarGraph } from '../graphs';

type AllStandingsCardProps = {};
export const AllStandingsCard: FC<AllStandingsCardProps> = async () => {
  const teams = await getTeams();
  const teamActivities = await Promise.all(
    teams.map((team) => getActivitiesByTeam(team.id)),
  );

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
