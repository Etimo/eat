'use client';
import { Button } from '@/components/buttons';
import { Card } from '@/components/card/Card';
import { Team, User } from '@/types';
import { FC, useEffect, useState } from 'react';

export const TeamsTab: FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamlessUsers, setTeamlessUsers] = useState<User[]>([]);

  useEffect(() => {
    const getTeams = async () => {
      const response = await fetch('/api/team');
      const { teams: t }: { teams: Team[] } = await response.json();

      if (t.length) {
        setTeams(t);
      } else {
        setTeams([]);
      }
    };
    const getUserWithoutTeam = async () => {
      const response = await fetch('/api/user/noteam');
      const { users: u }: { users: User[] } = await response.json();

      if (u.length) {
        setTeamlessUsers(u);
      } else {
        setTeamlessUsers([]);
      }
    };

    getTeams();
  }, []);
  return (
    <div className="pt-8 flex flex-col gap-8">
      <div>
        <div>
          <Button
            label="Create team"
            color="success"
            icon={{ placement: 'left', variant: 'Plus' }}
            onClick={() => {}}
          />
        </div>
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
        <h2 className="font-medium text-xl mb-2">Teamless users</h2>
      </div>
    </div>
  );
};
TeamsTab.displayName = 'TeamsTab';
