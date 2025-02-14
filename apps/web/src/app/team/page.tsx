import { NavigationTrail } from '@/components/navigation';
import { trpc } from '@/trpc/server';

export default async function Page() {
  const teams = await trpc.teams.list();

  return (
    <main className="flex flex-col gap-5 px-4 pt-4 pb-10">
      <NavigationTrail />
      {teams.map((team) => (
        <div key={team.id}>{team.name}</div>
      ))}
    </main>
  );
}
