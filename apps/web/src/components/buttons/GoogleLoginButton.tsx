'use client';

import { GoogleIcon } from '@/icons';
import classNames from 'classnames';
import { FC } from 'react';
import { signOut } from 'next-auth/react';

export const GoogleLoginButton: FC = () => {
  return (
    <button
      className={classNames(
        'flex items-center gap-2 bg-etimo text-white border border-etimo shadow-lg rounded-md',
        'active:scale-[0.99]',
      )}
      onClick={() => signOut()}
    >
      <div className="bg-white p-2 rounded-l-md">
        <GoogleIcon size={24} />
      </div>
      <div className="text-base pr-2">Sign in with Google</div>
    </button>
  );
};
GoogleLoginButton.displayName = 'GoogleLoginButton';
