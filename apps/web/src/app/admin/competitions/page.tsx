import { getCompetitionsGroupedByYear } from '@/api';
import { NavigationTrail } from '@/components/navigation';
import { Icon } from '@/icons';
import { dayjs } from '@/utils';
import Link from 'next/link';

export default async function Page() {
  const competitionGroups = await getCompetitionsGroupedByYear();

  return (
    <main className="flex flex-col gap-5 px-4 pt-4">
      <NavigationTrail />
      <div className="flex flex-col gap-5">
        {competitionGroups.reverse().map(({ year, competitions }) => (
          <div key={year}>
            <h2 className="text-2xl font-medium">{year}</h2>
            <div className="grid grid-cols-3 gap-x-5">
              {competitions.map((competition) => (
                <Link
                  key={competition.id}
                  href={`/admin/competitions/${competition.id}`}
                  className="flex flex-col items-center gap-3 bg-etimo rounded-lg p-4"
                >
                  <div className="flex justify-between w-full gap-2">
                    <div>{competition.startDate}</div>
                    <div>-</div>
                    <div>{competition.endDate}</div>
                  </div>
                  <div className="flex justify-between w-full gap-2">
                    <div>Teams: {competition.teams.length}</div>
                    {dayjs().isBetween(
                      competition.startDate,
                      competition.endDate,
                    ) && (
                      <div className="flex gap-1 text-green-400">
                        <Icon.Check /> Current
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
