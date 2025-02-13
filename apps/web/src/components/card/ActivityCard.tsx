'use client';

import { trpc } from '@/trpc/client';
import { Card } from './Card';
import { TeamRatioGraph } from '../graphs';
import { Icon } from '@/icons';
import { useMemo, useState } from 'react';

export const ActivityCard = () => {
  const [period, setPeriod] = useState<'today' | 'week' | 'total'>('today');

  const title = useMemo(() => {
    switch (period) {
      case 'today':
        return 'Idag';
      case 'week':
        return 'Vecka';
      case 'total':
        return 'Totalt';
    }
  }, [period]);

  const { data } = trpc.activities.dashboard.today.useQuery();

  return (
    <Card title="Mitt lag">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-2xl">{title}</h2>
        <div className="flex gap-1 items-center text-gray-300">
          <button onClick={() => setPeriod('today')}>
            <Icon.Calendar />
          </button>
          <button onClick={() => setPeriod('week')}>
            <Icon.Calendar />
          </button>
          <button onClick={() => setPeriod('total')}>
            <Icon.Calendar />
          </button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <div className="text-xl font-medium">Min aktivitet</div>
            <div className="text-xl text-green-400">{data?.user ?? 0} min</div>
          </div>
          <div className="flex flex-col">
            <div className="text-xl font-medium">Lag</div>
            <div className="text-xl text-red-400">{data?.team ?? 0} min</div>
          </div>
        </div>
        <div>
          <TeamRatioGraph
            data={{ user: data?.user ?? 0, team: data?.team ?? 0 }}
          />
        </div>
      </div>
      <hr className="-mx-6 my-2 h-0.5 border-t-gradient-start" />
      <div className="flex justify-between">
        <div className="text-3xl font-semibold">Total</div>
        <div className="text-3xl font-semibold">
          {data?.user ?? 0 + (data?.team ?? 0)} min
        </div>
      </div>
    </Card>
  );
};
ActivityCard.displayName = 'ActivityCard';
