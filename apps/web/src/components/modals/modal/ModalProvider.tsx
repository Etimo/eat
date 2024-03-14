'use client';

import { FC, useState, useCallback, useEffect, ReactNode } from 'react';
import { Modal } from './Modal';
import { ModalContext } from '../../../contexts';
import { AnimatePresence } from 'framer-motion';

type ModalProviderProps = {
  children: ReactNode;
};
export const ModalProvider: FC<ModalProviderProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modal, setModal] = useState<ReactNode>(null);

  const closeModal = useCallback(() => {
    setIsVisible(false);
    setModal(null);
  }, []);

  useEffect(() => {
    setIsVisible(!!modal);
  }, [modal]);

  const handleSetModal = useCallback((modal: ReactNode) => {
    setModal(modal);
  }, []);

  return (
    <ModalContext.Provider
      value={{ setModal: handleSetModal, closeModal }}
      {...props}
    >
      {props.children}
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isVisible && <Modal content={modal} handleClose={closeModal} />}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};
ModalProvider.displayName = 'ModalProvider';
