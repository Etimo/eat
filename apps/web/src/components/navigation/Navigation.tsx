import { FC } from 'react';
import { ModalButton, ModalCloseButton, NewActivity } from '../modals';
import { NavigationItem } from './NavigationItem';
import Image from 'next/image';
import etimoLogo from '@/assets/Etimo-white.png';
import Link from 'next/link';
import { CurrentUserMenu } from './CurrentUserMenu';

const navigation = [
  { label: 'Dashboard', href: '/' },
  { label: 'Team', href: '/team' },
  { label: 'History', href: '/history' },
  { label: 'Standings', href: '/standings' },
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
          <NewActivity />
          <CurrentUserMenu />
        </div>
      </div>
      {/* 
        TODO: 2024-03-14, André
        Add UI for mobile navigation
      */}
    </nav>
  );
};
Navigation.displayName = 'Navigation';
