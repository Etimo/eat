import { getCompetition } from '@/api';
import { Button } from '@/components/buttons';
import { Card } from '@/components/card/Card';
import { AddTeam, SeedTeams } from '@/components/modals';
import { NavigationTrail } from '@/components/navigation';
import Link from 'next/link';

export default async function Page({ params }: { params: { uuid: string } }) {
  const competition = (await getCompetition(params.uuid))!;

  const handleEditDates = async () => {
    'use server';
    console.log('🔥');
  };

  return (
    <main className="flex flex-col gap-5 px-4 pt-4">
      <NavigationTrail slug="Competition" />
      <div className="flex">
        <div className="flex gap-1">
          <div>{competition.startDate}</div>
          <div>-</div>
          <div>{competition.endDate}</div>
        </div>
        <div className="flex-1 flex justify-end gap-1.5">
          <AddTeam />
          <Button
            label="Edit dates"
            color="outline"
            onClick={handleEditDates}
            icon={{ placement: 'left', variant: 'Edit' }}
          />
          <SeedTeams />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="font-medium text-xl mb-2">Teams</h2>
          <div className="grid grid-cols-5 gap-2">
            {competition.teams.map(({ id, name }) => (
              <Link
                key={id}
                className="bg-etimo px-4 py-2 text-center rounded-lg truncate"
                href={`/admin/teams/${id}`}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
        <Card title="Total minutes">
          <div className="border h-96" />
        </Card>
        <Card title="Activity minutes">
          <div className="border h-96" />
        </Card>
      </div>
    </main>
  );
}
