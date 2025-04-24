import { FC } from 'react';
import { useAuth } from '../../hooks';

export const CurrentUserMenu: FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="h-12 w-12 rounded-full bg-etimo flex justify-center items-center">
      {user?.picture ? (
        <div onClick={() => logout()} className="cursor-pointer">
          <img
            src={user?.picture ?? '#'}
            alt={user?.name ?? '#'}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
CurrentUserMenu.displayName = 'CurrentUserMenu';
