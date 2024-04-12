import { getTeams } from '@/api';
import { Card } from '@/components/card/Card';
import { NavigationTrail } from '@/components/navigation';

export default async function Page() {
  const teams = await getTeams();
  return (
    <main className="flex flex-col gap-5 px-4 pt-4">
      <NavigationTrail />
      <div>
        <div className="pt-8 grid grid-cols-3 gap-x-3 gap-y-6 items-stretch">
          {teams.map((team) => (
            <Card key={team.id} title={team.name}>
              <div className="flex-1 flex flex-col gap-1.5">
                {team.users.length ? (
                  team.users.map((user) => (
                    <div
                      key={user.name}
                      className="flex gap-1.5 items-center hover:bg-white/25 px-2 py-1 -mx-2 -my-1 rounded-lg"
                    >
                      <div className="w-10 h-10 rounded-full bg-gray-400 text-white uppercase text-xs flex items-center justify-center">
                        {user.name
                          .split(' ')
                          .map((x) => x.substring(0, 1))
                          .join('')}
                      </div>
                      <div>{user.name}</div>
                    </div>
                  ))
                ) : (
                  <div className="">No members</div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
      <div>
        {/* <h2 className="font-medium text-xl mb-2">Teamless users</h2> */}
        {/* Maybe drag & drop into teams? */}
      </div>
    </main>
  );
}
