import { ModalContext } from '@/contexts';
import { PropsWithChildren, useState } from 'react';

export const ModalProvider = (props: PropsWithChildren<{}>) => {
  const { children } = props;

  const [isOpen, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const open = () => setOpen(true);

  return (
    <ModalContext.Provider value={{ isOpen, open, onClose }}>
      {children}
    </ModalContext.Provider>
  );
};
