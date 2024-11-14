import { getActivitiesByUserGroupedByMonth } from '@/server/activity';
import { ActivityFilters } from '@/components/history/ActivityFilters';
import { HistoryItem } from '@/components/history/HistoryItem';
import { NavigationTrail } from '@/components/navigation';

const currentUser = '941a7069-ba45-4670-ab27-6411b9049441';

export default async function Page() {
  const { activityGroups } =
    await getActivitiesByUserGroupedByMonth(currentUser);

  return (
    <main className="flex flex-col gap-5 px-4 pt-4 pb-10">
      <NavigationTrail />
      <ActivityFilters />
      {activityGroups.reverse().map(({ month, activities }) => (
        <div key={month} className="flex flex-col gap-2 drop-shadow-xl">
          <h2 className="text-2xl font-medium">{month}</h2>
          {activities.map((activity) => (
            <HistoryItem key={activity.id} activity={activity} />
          ))}
        </div>
      ))}
    </main>
  );
}
