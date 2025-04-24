import { Navigation } from '@/components/navigation';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <main className="flex-1 flex flex-col">
      <Navigation />
      <Outlet />
    </main>
  );
};
