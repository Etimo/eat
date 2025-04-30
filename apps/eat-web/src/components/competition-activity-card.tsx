import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { trpc } from '@/trpc';
import { useMemo } from 'react';

export const CompetitionActivityCard = () => {
  const { data } = trpc.activities.dashboard.total.useQuery();
  const { data: currentTeam } = trpc.teams.getCurrentUserTeam.useQuery();

  const { user, team, total } = useMemo(() => {
    const user = data?.user ?? 0;
    const team = data?.team ?? 0;
    const total = user + team;

    return { user, team, total };
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Totalt</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col">
              <div className="text-lg font-medium">Min aktivitet</div>
              <div className="text-xl font-semibold text-green-400">
                {user} min
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-medium">
                {currentTeam?.name ?? 'Lag'}
              </div>
              <div className="text-xl font-semibold text-red-400">
                {team} min
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <hr className="-mx-6 my-4 h-0.5 border-t-gradient-start" />
        <div className="flex justify-between">
          <div className="text-2xl font-semibold">Total</div>
          <div className="text-2xl font-semibold">{total} min</div>
        </div>
      </CardContent>
    </Card>
  );
};
