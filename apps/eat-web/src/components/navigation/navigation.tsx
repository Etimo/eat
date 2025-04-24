import { FC } from 'react';
import { NavigationItem } from './navigation-item';
import etimoLogo from '../../assets/Etimo-white.png';
import { CurrentUserMenu } from './current-user-menu';
import { NavLink } from 'react-router';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import { useAuth } from '@/hooks';

const navigation = [
  { title: 'Översikt', href: '/' },
  { title: 'Lag', href: '/teams' },
  { title: 'Aktiviteter', href: '/activities' },
  { title: 'Standing', href: '/standings' },
];

export const Navigation: FC = () => {
  const { isAdmin } = useAuth();

  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block">
        <nav className="bg-transparent py-4">
          <div className="max-w-4xl mx-auto flex items-center gap-8 xs:gap-8 px-4">
            <NavLink to="/">
              <div className="w-28 flex justify-center items-center">
                <img src={etimoLogo} width={112} height={27} alt="Etimo Logo" />
              </div>
            </NavLink>
            <div className="hidden md:flex items-baseline space-x-2">
              {navigation.map((item) => (
                <NavigationItem key={item.href} {...item} />
              ))}
              {isAdmin && (
                <NavigationItem key={'/admin'} href="/admin" title="Admin" />
              )}
            </div>
            <div className="flex-1 flex justify-end items-center gap-3">
              <CurrentUserMenu />
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile */}
      <div className="flex lg:hidden justify-between p-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent py-6">
                <div className="w-28 flex justify-center items-center">
                  <img
                    src={etimoLogo}
                    width={112}
                    height={27}
                    alt="Etimo Logo"
                  />
                </div>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {navigation.map((item, index) => (
                  <NavigationMenuLink key={index}>
                    <NavLink
                      to={item.href}
                      className="block w-full py-2 px-4 text-left text-base font-medium text-gray-300"
                    >
                      {item.title}
                    </NavLink>
                  </NavigationMenuLink>
                ))}

                {isAdmin && (
                  <NavigationMenuLink>
                    <NavLink to="/admin" title="Admin">
                      Admin
                    </NavLink>
                  </NavigationMenuLink>
                )}
                {isAdmin && (
                  <NavigationItem key={'/admin'} href="/admin" title="Admin" />
                )}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-1 flex justify-end items-center px-2">
          <CurrentUserMenu />
        </div>
      </div>
    </>
  );
};
Navigation.displayName = 'Navigation';
