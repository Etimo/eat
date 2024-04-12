'use client';
import { Icon } from '@/icons';
import { Competition } from '@/types';
import { FC, useEffect, useState } from 'react';

export const CompetitionsTab: FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  useEffect(() => {
    const getCompetition = async () => {
      const response = await fetch('/api/competition');
      const { competitions: c }: { competitions: Competition[] } =
        await response.json();

      if (c.length) {
        setCompetitions(c);
      } else {
        setCompetitions([]);
      }
    };

    getCompetition();
  }, []);

  /*
  
  const years = [
      ...new Set(
        competitions
          .sort((a, b) =>
            dayjs(a.startDate).year() > dayjs(b.startDate).year() ? 1 : -1,
          )
          .map(({ date }) => dayjs(date).format('YYYY')),
      ),
    ].filter(Boolean);

  */

  return (
    <div className="pt-8 flex flex-col">
      {competitions.map((competition) => (
        <div
          key={competition.id}
          className="flex items-center bg-etimo rounded-lg px-6 py-4 gap-2 cursor-pointer"
        >
          <div className="text-xl font-medium">{competition.startDate}</div>
          <div>-</div>
          <div className="text-xl font-medium">{competition.endDate}</div>
          <div className="flex-1 flex justify-end pr-6">
            <div>
              Teams: {competition.teams.length}
              {/* {competition.teams.map((team) => (
              <span key={team.id}>{team.name}</span>
            ))} */}
            </div>
          </div>
          <div>
            <Icon.Chevron direction="down" />
          </div>
        </div>
      ))}
    </div>
  );
};
CompetitionsTab.displayName = 'CompetitionsTab';
