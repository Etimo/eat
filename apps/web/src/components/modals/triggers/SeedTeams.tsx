'use client';
import { FC, useCallback } from 'react';
import { Button } from '../../buttons';
import { useModal } from '@/hooks';
import { SeedTeamsModal } from '../SeedTeamsModal';

export const SeedTeams: FC = () => {
  const { setModal } = useModal();

  const handleClick = useCallback(() => {
    setModal(<SeedTeamsModal />);
  }, [setModal]);

  return (
    <div>
      <Button
        label="Seed Teams"
        size="medium"
        color="outline"
        onClick={handleClick}
        icon={{ placement: 'left', variant: 'Shuffle' }}
      />
    </div>
  );
};
SeedTeams.displayName = 'SeedTeams';
