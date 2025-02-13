import { getAuthSession } from '@/auth';
import { NavigationTrail } from '@/components/navigation';
import { createServerTrpc } from '@/trpc/trpc';

export default async function Page() {
  const session = await getAuthSession();
  const trpc = createServerTrpc(session?.accessToken!);

  const teams = await trpc.teams.list.query();

  return (
    <main className="flex flex-col gap-5 px-4 pt-4 pb-10">
      <NavigationTrail />
      {teams.map((team) => (
        <div key={team.id}>{team.name}</div>
      ))}
    </main>
  );
}
