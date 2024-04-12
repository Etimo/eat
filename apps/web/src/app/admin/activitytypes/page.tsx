import { getActivityTypes } from '@/api';
import { NavigationTrail } from '@/components/navigation';
import { Icon } from '@/icons';

export default async function Page() {
  const activitytypes = await getActivityTypes();

  return (
    <main className="flex flex-col gap-5 px-4 pt-4">
      <NavigationTrail />
      <div className="grid grid-cols-4 gap-2">
        {activitytypes
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(({ id, name }) => (
            <article
              key={id}
              className="bg-etimo px-3 py-1.5 flex justify-between rounded-md"
            >
              <div>{name}</div>
              <div className="flex gap-1 items-center">
                <span className="text-white cursor-pointer">
                  <Icon.Edit size={18} />
                </span>
                <span className="text-red-400 cursor-pointer">
                  <Icon.Delete size={22} />
                </span>
              </div>
            </article>
          ))}
      </div>
    </main>
  );
}
