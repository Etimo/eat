'use client';
import { FC, useCallback } from 'react';
import { Button } from '../../buttons';
import { useModal } from '@/hooks';
import { NewActivityModal } from '..';

export const NewActivity: FC = () => {
  const { setModal } = useModal();

  const handleClick = useCallback(() => {
    setModal(<NewActivityModal />);
  }, [setModal]);

  return (
    <div>
      <Button
        label="New Activity"
        size="medium"
        color="success"
        onClick={handleClick}
        icon={{ placement: 'left', variant: 'Plus' }}
      />
    </div>
  );
};
NewActivity.displayName = 'NewActivity';
