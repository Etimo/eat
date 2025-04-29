import { createContext } from 'react';

type ModalContextType = {
  modalName: string;
  targetId: string | undefined;
  openModal: (modal: string, targetId?: string) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextType>(null as never);
