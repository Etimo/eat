import { Navigation } from '@/components/navigation';
import { Outlet } from 'react-router';

export const Layout = () => {
  return (
    <main className="flex-1 flex flex-col">
      <Navigation />
      <div className="flex flex-col" style={{ flex: '1 1 0px' }}>
        <Outlet />
      </div>
    </main>
  );
};
