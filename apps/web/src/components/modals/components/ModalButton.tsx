'use client';

import { useModal } from '@/hooks';
import { FC, ReactNode, useCallback } from 'react';

type ModalButtonProps = {
  modal: ReactNode;
  children: ReactNode;
};
export const ModalButton: FC<ModalButtonProps> = (props) => {
  const { children, modal } = props;
  const { setModal } = useModal();

  const triggerModal = useCallback(() => {
    setModal(modal);
  }, [setModal, modal]);

  return (
    <div onClick={triggerModal} className="inline m-0 p-0">
      {children}
    </div>
  );
};
ModalButton.displayName = 'ModalButton';
