import { createContext } from 'react';

type ModalContextType = {
  modalName: string;
  open: (modal: string) => void;
  onClose: () => void;
};

export const ModalContext = createContext<ModalContextType>(null as never);
