import { FC } from 'react';
import { NavLink } from 'react-router';

type NavigationItemProps = {
  title: string;
  href: string;
};
export const NavigationItem: FC<NavigationItemProps> = (props) => {
  const { title, href } = props;

  return (
    <NavLink
      to={href}
      className={({ isActive, isPending, isTransitioning }) =>
        [
          isPending ? 'pending' : '',
          isActive
            ? 'bg-etimo text-white'
            : 'text-gray-300 hover:bg-white/10 hover:text-white',
          isTransitioning ? 'transitioning' : '',
          'rounded-md px-3 py-2 text-sm font-medium',
        ].join(' ')
      }
    >
      {title}
    </NavLink>
  );
};
NavigationItem.displayName = 'NavigationItem';
