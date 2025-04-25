import { CompetitionActivityCard } from '@/components/competition-activity-card';
import { TodaysActivityCard } from '@/components/todays-activity-card';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { useCurrentCompetition } from '@/stores';
import { trpc } from '@/trpc';
import { Medal, Trophy } from 'lucide-react';
import { useEffect } from 'react';

export const HomePage = () => {
  const { data } = trpc.teams.leaderboard.useQuery();
  const { setCurrentCompetition } = useCurrentCompetition();
  const currentCompetitionQuery = trpc.competitions.getCurrent.useQuery();

  useEffect(() => {
    if (currentCompetitionQuery.data) {
      const { id } = currentCompetitionQuery.data;
      setCurrentCompetition(id);
    }
  }, [currentCompetitionQuery.data]);

  const getMedalColor = (position: number) => {
    switch (position) {
      case 0:
        return 'text-yellow-500';
      case 1:
        return 'text-slate-300';
      case 2:
        return 'text-amber-700';
      default:
        return 'text-transparent';
    }
  };

  const getRowColor = (index: number) => {
    switch (index) {
      case 0:
        return 'bg-yellow-500/10 hover:bg-yellow-500/20';
      case 1:
        return 'bg-slate-300/10 hover:bg-slate-300/20';
      case 2:
        return 'bg-amber-700/10 hover:bg-amber-700/20';
      default:
        return 'hover:bg-slate-800/50';
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 px-4 pb-10">
        <h1 className="text-3xl font-semibold mt-4">Översikt</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <TodaysActivityCard />
          <CompetitionActivityCard />
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2 pt-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="w-8 h-8 text-yellow-500" />
          <h2 className="text-2xl font-bold text-center">Leaderboard</h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-slate-700">
              <TableHead>Placering</TableHead>
              <TableHead>Lag</TableHead>
              <TableHead>Minuter</TableHead>
              <TableHead>Aktiviteter</TableHead>
              <TableHead>Totalpoäng</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((team, index) => (
              <TableRow
                key={team.id}
                className={`
                  whitespace-nowrap
                  transition-all duration-200
                  ${getRowColor(index)}
                `}
              >
                <TableCell className="w-12">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${index < 3 ? 'text-lg' : ''}`}>
                      {index + 1}
                    </span>
                    {index < 3 && (
                      <Medal className={`w-6 h-6 ${getMedalColor(index)}`} />
                    )}
                  </div>
                </TableCell>
                <TableCell
                  className={`font-semibold ${index < 3 ? 'text-lg' : ''}`}
                >
                  {team.name}
                </TableCell>
                <TableCell>
                  <span className="text-emerald-400 font-medium">
                    {team.totalMinutes} min
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sky-400 font-medium">
                    {team.totalUniqueActivities}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`font-bold ${index < 3 ? 'text-xl text-yellow-500' : 'text-lg'}`}
                  >
                    {team.totalMinutes + team.totalUniqueActivities * 30}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
