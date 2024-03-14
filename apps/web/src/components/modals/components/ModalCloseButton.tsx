'use client';

import { useModal } from '@/hooks';
import { Icon } from '@/icons';
import { FC } from 'react';

export const ModalCloseButton: FC = () => {
  const { closeModal } = useModal();
  return (
    <div
      className="absolute right-2 top-2 cursor-pointer p-2"
      onClick={closeModal}
    >
      <Icon.Close size={20} />
    </div>
  );
};
ModalCloseButton.displayName = 'ModalCloseButton';
