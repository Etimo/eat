'use client';
import { createContext } from 'react';

export type SetModalContextProps = {
  modal: React.ReactNode;
};

type ModalContextProps = {
  setModal: (modal: React.ReactNode) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextProps>({
  setModal: () => {},
  closeModal: () => {},
});
ModalContext.displayName = 'ModalContext';
