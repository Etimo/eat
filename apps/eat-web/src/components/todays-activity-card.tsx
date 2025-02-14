import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { trpc } from '@/trpc';

export const TodaysActivityCard = () => {
  const { data } = trpc.activities.dashboard.today.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dagens aktivitet</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col">
              <div className="text-lg font-medium">Min aktivitet</div>
              <div className="text-xl font-semibold text-green-400">
                {data?.user ?? 0} min
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-medium">Lag</div>
              <div className="text-xl font-semibold text-red-400">
                {data?.team ?? 0} min
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <hr className="-mx-6 my-4 h-0.5 border-t-gradient-start" />
        <div className="flex justify-between">
          <div className="text-2xl font-semibold">Total</div>
          <div className="text-2xl font-semibold">
            {data?.user ?? 0 + (data?.team ?? 0)} min
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
