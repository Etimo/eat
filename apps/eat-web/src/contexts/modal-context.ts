import { createContext } from 'react';

type ModalContextType = {
  modalName: string;
  openModal: (modal: string) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>(null as never);
