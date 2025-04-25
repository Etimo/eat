import { AddActivityForm } from '@/components/forms';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

import { useModal } from '@/hooks/use-modal';
import { trpc } from '@/trpc';

export const AddActivityPage = () => {
  const { data, refetch } = trpc.competitions.list.useQuery();
  const { modalName, openModal, closeModal } = useModal();

  if (!data) return null;
  return (
    <div className="flex-1 flex flex-col gap-2 pt-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Aktivitet</h1>
        <Button className="dark" onClick={() => openModal('comp')}>
          Lägg till
        </Button>
      </div>      
      <Modal isOpen={modalName === 'comp'}>
        <AddActivityForm
          onFinish={() => {
            closeModal();
            refetch();
          }}
        />
      </Modal>
    </div>
  );
};
