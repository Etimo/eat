import { FC } from 'react';
import { getActivitiesByUser } from '@/server/activity';
import { HistoryItem } from './HistoryItem';
import Link from 'next/link';

const currentUser = '941a7069-ba45-4670-ab27-6411b9049441';

export const RecentActivities: FC = async () => {
  const activites = await getActivitiesByUser(currentUser, true);

  return (
    <section className="flex flex-col drop-shadow-xl">
      <Link href="/history" className="flex-1 flex flex-col">
        <h2 className="font-medium text-xl mb-2">Recent</h2>
        <div className="flex flex-col flex-1 justify-between gap-2">
          {activites.slice(0, 3).map((activity, index) => (
            <HistoryItem key={index} activity={activity} />
          ))}
        </div>
      </Link>
    </section>
  );
};
RecentActivities.displayName = 'RecentActivities';
