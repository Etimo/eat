'use client';
import { FC, useCallback } from 'react';
import { Button } from '../../buttons';
import { useModal } from '@/hooks';
import { AddTeamModal } from '../AddTeamModal';

export const AddTeam: FC = () => {
  const { setModal } = useModal();

  const handleClick = useCallback(() => {
    setModal(<AddTeamModal />);
  }, [setModal]);

  return (
    <div>
      <Button
        label="Add Team"
        size="medium"
        color="success"
        onClick={handleClick}
        icon={{ placement: 'left', variant: 'Plus' }}
      />
    </div>
  );
};
AddTeam.displayName = 'AddTeam';
