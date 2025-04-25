import { ModalContext } from '@/contexts';
import { PropsWithChildren, useState } from 'react';

export const ModalProvider = (props: PropsWithChildren<object>) => {
  const { children } = props;

  const [modalName, setModalName] = useState<string>('');
  const [targetId, setTargetId] = useState<string | undefined>(undefined);
  const closeModal = () => setModalName('');
  const openModal = (name: string, targetId?: string) => {setModalName(name); setTargetId(targetId);};

  return (
    <ModalContext.Provider value={{ modalName, openModal, closeModal, targetId }}>
      {children}
    </ModalContext.Provider>
  );
};
