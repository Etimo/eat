'use client';

import { useCurrentUserStore } from '@/providers';
import { FC } from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

export const CurrentUserMenu: FC = () => {
  const { currentUser } = useCurrentUserStore((state) => state);

  return (
    <div className="h-12 w-12 rounded-full bg-etimo flex justify-center items-center">
      {currentUser ? (
        <button onClick={() => signOut()}>
          <Image
            src={currentUser?.image ?? '#'}
            alt={currentUser?.name ?? '#'}
            width={48}
            height={48}
            className="rounded-full"
          />
        </button>
      ) : (
        ' '
      )}
    </div>
  );
};
CurrentUserMenu.displayName = 'CurrentUserMenu';
