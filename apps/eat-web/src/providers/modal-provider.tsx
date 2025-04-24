import { ModalContext } from '@/contexts';
import { PropsWithChildren, useState } from 'react';

export const ModalProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const [modalName, setModalName] = useState<string>('');
  const closeModal = () => setModalName('');
  const openModal = (name: string) => setModalName(name);

  return (
    <ModalContext.Provider value={{ modalName, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
