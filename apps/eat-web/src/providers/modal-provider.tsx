import { ModalContext } from '@/contexts';
import { PropsWithChildren, useState } from 'react';

export const ModalProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const [modalName, setModalName] = useState<string>('');
  const onClose = () => setModalName('');
  const open = (name: string) => setModalName(name);

  return (
    <ModalContext.Provider value={{ modalName, open, onClose }}>
      {children}
    </ModalContext.Provider>
  );
};
