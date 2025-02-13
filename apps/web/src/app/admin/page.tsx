import { NavigationTrail } from '@/components/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const navigation = [
  { label: 'Competitions', path: '/admin/competitions' },
  { label: 'Teams', path: '/admin/teams' },
  { label: 'Activity Types', path: '/admin/activitytypes' },
];

export default async function Page() {
  return (
    <main className="flex flex-col gap-5 px-4 pt-4">
      <NavigationTrail />
      {/* <h1 className="text-4xl font-semibold">Admin</h1> */}
      <div className="flex gap-2">
        {navigation.map(({ label, path }, index) => (
          <Link
            key={index}
            className={cn(
              'text-gray-300 hover:border-etimo hover:text-white',
              'transition-colors duration-200',
              'border border-transparent rounded-md px-3 py-2 text-sm font-medium cursor-pointer relative',
            )}
            href={path}
          >
            <div className="relative z-20">{label}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
