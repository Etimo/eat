import { useModal } from '@/hooks/use-modal';
import { Button } from '../ui/button';
import { Modal } from '../ui/modal';
import { AddActivityForm } from '../forms';

export const RegisterActivity = () => {
  const { openModal, closeModal, modalName } = useModal();
  return (
    <>
      <Button
        variant="secondary"
        onClick={() => openModal('register-activity')}
      >
        Ny aktivitet
      </Button>

      <Modal isOpen={modalName === 'register-activity'}>
        <AddActivityForm onFinish={closeModal} />
      </Modal>
    </>
  );
};
