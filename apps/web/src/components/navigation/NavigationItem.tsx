'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useMemo } from 'react';

type NavigationItemProps = {
  label: string;
  href: string;
};
export const NavigationItem: FC<NavigationItemProps> = (props) => {
  const { label, href } = props;
  const path = usePathname();

  const active = useMemo(() => {
    if (path === '/' || href === '/') {
      return path === href;
    }
    return path.split('/').includes(href.replace('/', ''));
  }, [href, path]);

  return (
    <Link
      href={href}
      className={classNames(
        active
          ? 'bg-etimo text-white'
          : 'text-gray-300 hover:bg-white/10 hover:text-white',
        'rounded-md px-3 py-2 text-sm font-medium',
      )}
    >
      {label}
    </Link>
  );
};
NavigationItem.displayName = 'NavigationItem';
