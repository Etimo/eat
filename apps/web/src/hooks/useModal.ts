import { ModalContext } from '@/contexts';
import { useContext } from 'react';

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};
