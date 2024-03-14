'use client';

import { Icon } from '@/icons';
import { uuidPattern } from '@/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useMemo } from 'react';

type NavigationTrailProps = {
  slug?: string;
};
export const NavigationTrail: FC<NavigationTrailProps> = ({ slug }) => {
  const pathname = usePathname();

  const paths = useMemo(() => {
    let text = pathname;
    if (slug) {
      text = pathname.replace(uuidPattern, slug);
    }
    return text.split('/').filter(Boolean);
  }, [pathname, slug]);

  const back = useMemo(() => {
    return pathname.substring(0, pathname.lastIndexOf('/')) || '/';
  }, [pathname]);

  return (
    <div className="flex gap-1.5 items-center">
      <Link href={back}>
        <Icon.Chevron direction="left" size={24} />
      </Link>
      <h1 className="flex gap-1.5 text-2xl font-semibold flex-1 capitalize tracking-wide">
        {paths.map((path, index) => {
          const url = pathname
            .split('/')
            .filter(Boolean)
            .slice(0, index + 1)
            .join('/');

          return (
            <Link key={url} href={`/${url}`}>
              <div className="flex gap-1.5 items-center">
                <span className="hover:text-gray-300 transition-colors duration-100">
                  {path}
                </span>
                {index !== paths.length - 1 && (
                  <span className="font-light">/</span>
                )}
              </div>
            </Link>
          );
        })}
      </h1>
    </div>
  );
};
