import { FC } from 'react';
import { NavigationItem } from './NavigationItem';
import Image from 'next/image';
import etimoLogo from '@/assets/Etimo-white.png';
import Link from 'next/link';
import { CurrentUserMenu } from './CurrentUserMenu';

const navigation = [
  { label: 'Översikt', href: '/' },
  { label: 'Lag', href: '/team' },
  { label: 'Historik', href: '/history' },
  { label: 'Standing', href: '/standings' },
  { label: 'Admin', href: '/admin' },
];

export const Navigation: FC = () => {
  return (
    <nav className="bg-transparent py-4">
      <div className="max-w-4xl mx-auto flex items-center gap-8 xs:gap-8 px-4">
        <Link href="/">
          <div className="w-28 flex justify-center items-center">
            <Image src={etimoLogo} width={112} height={27} alt="Etimo Logo" />
          </div>
        </Link>
        <div className="hidden md:flex items-baseline space-x-2">
          {navigation.map((item, index) => (
            <NavigationItem key={index} {...item} />
          ))}
        </div>
        <div className="flex-1 flex justify-end items-center gap-3">
          <CurrentUserMenu />
        </div>
      </div>
    </nav>
  );
};
Navigation.displayName = 'Navigation';
