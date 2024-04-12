import { FC } from 'react';
import { Card } from './Card';
import { getActivitiesByTeam } from '@/api';
import { TeamRatioGraph } from '../graphs';

const currentUser = '98027300-446b-4f8b-b2dc-a050d410d604';
const currentTeam = '574d2932-8919-469b-aef0-535534494c96';

export const ActivityCard: FC = async () => {
  const teamActivities = await getActivitiesByTeam(currentTeam);

  const user = teamActivities.activities
    .filter((activity) => activity.user.id === currentUser)
    .reduce((total, { time }) => total + time, 0);
  const team = teamActivities.activities
    .filter((activity) => activity.user.id !== currentUser)
    .reduce((total, { time }) => total + time, 0);

  return (
    <Card title="Today's activity">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <div className="text-2xl font-semibold">You</div>
            <div className="text-2xl text-green-400">{user} min</div>
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-semibold">Team</div>
            <div className="text-2xl text-red-400">{team} min</div>
          </div>
        </div>
        <div>
          <TeamRatioGraph data={{ user, team }} />
        </div>
      </div>
      <hr className="-mx-6 my-4 h-0.5 border-t-gradient-start" />
      <div className="flex justify-between">
        <div className="text-3xl font-semibold">Total</div>
        <div className="text-3xl font-semibold">{user + team} min</div>
      </div>
    </Card>
  );
};
ActivityCard.displayName = 'ActivityCard';
