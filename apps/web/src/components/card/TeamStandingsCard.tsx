import { Card } from './Card';
import { getActivitiesByTeam } from '@/server/activity';
import { BarGraph } from '../graphs';

const currentTeam = '574d2932-8919-469b-aef0-535534494c96';

export const TeamStandingsCard = async () => {
  const teamActivities = await getActivitiesByTeam(currentTeam);
  const members = teamActivities.activities
    .map(({ user }) => user)
    .filter(
      (user, index, self) =>
        self.findIndex(({ id }) => id === user.id) === index,
    );

  const activityTimePerMember = (id: string) => {
    const memberActivities = teamActivities.activities.filter(
      ({ user }) => user.id === id,
    );
    return memberActivities.reduce((total, { time }) => total + time, 0);
  };

  const teamStanding = members.map((member) => ({
    label: member.name,
    value: activityTimePerMember(member.id),
  }));

  const total = teamStanding.reduce((total, { value }) => total + value, 0);

  return (
    <Card title="Team">
      <div className="flex justify-between gap-2.5">
        <BarGraph data={teamStanding} />
      </div>
      <hr className="-mx-6 my-4 h-0.5 border-t-gradient-start" />
      <div className="flex justify-between">
        <div className="text-3xl font-semibold">Total</div>
        <div className="text-3xl font-semibold">{total} min</div>
      </div>
    </Card>
  );
};
TeamStandingsCard.displayName = 'TeamStandingsCard';
