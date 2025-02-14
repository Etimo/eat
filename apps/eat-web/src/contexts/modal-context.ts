import { createContext } from 'react';

type ModalContextType = {
  isOpen: boolean;
  open: () => void;
  onClose: () => void;
};

export const ModalContext = createContext<ModalContextType>(null as never);
