import { FC } from 'react';
import { NavigationItem } from './navigation-item';

const navigation = [
  { title: 'Tävlingar', href: 'competitions' },
  { title: 'Lag', href: 'teams' },
];

export const AdminNavigation: FC = () => {
  return (
    <>
      <nav className="bg-transparent">
        <div className="max-w-4xl mx-auto flex items-center gap-8 px-4">
          <div className="hidden md:flex items-baseline space-x-2">
            {navigation.map((item, index) => (
              <NavigationItem key={index} {...item} />
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};
