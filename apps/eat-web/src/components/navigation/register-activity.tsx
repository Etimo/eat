import { useModal } from '@/hooks/use-modal';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
import { AddActivityForm } from '../forms';
import { trpc } from '@/trpc';

export const RegisterActivity = () => {
  const { openModal, closeModal, modalName } = useModal();
  const utils = trpc.useUtils();
  return (
    <>
      <Button
        variant="secondary"
        onClick={() => openModal('register-activity')}
      >
        Ny aktivitet
      </Button>

      <Modal isOpen={modalName === 'register-activity'}>
        <AddActivityForm
          onFinish={() => {
            closeModal();
            void utils.activities.invalidate();
            void utils.activityTypes.invalidate();
            void utils.teams.invalidate();
            void utils.activities.dashboard.today.reset();
            void utils.activities.dashboard.total.reset();
            void utils.teams.leaderboard.reset();
          }}
        />
      </Modal>
    </>
  );
};
