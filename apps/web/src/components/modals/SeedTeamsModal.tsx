'use client';

import { FC, useState } from 'react';
import { ModalCloseButton } from './components';
import { Button, IconButton } from '../buttons';

export const SeedTeamsModal: FC = () => {
  const [numberOfTeams, setNumberOfTeams] = useState(1);

  return (
    <div className="bg-white text-gray-800 relative rounded-t-lg md:rounded-lg flex flex-col gap-5 p-4 pt-8 h-[40%] xs:h-auto">
      <h2 className="text-xl font-semibold -mt-4 text-center">
        Number of teams
      </h2>
      <ModalCloseButton />
      <div className="flex flex-col gap-5 items-center">
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-4 max-w-[150px]">
            <IconButton
              variant="Minus"
              onClick={() => setNumberOfTeams((value) => value - 1)}
              disabled={numberOfTeams === 0}
            />
            <div className="text-xl flex-1 text-center pointer-events-none">
              {numberOfTeams}
            </div>
            <IconButton
              variant="Plus"
              onClick={() => setNumberOfTeams((value) => value + 1)}
            />
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Button label="Seed teams" onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};
SeedTeamsModal.displayName = 'SeedTeamsModal';
