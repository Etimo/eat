import { AdminNavigation } from '@/components/navigation';
import { Outlet } from 'react-router';

export const AdminLayout = () => {
  return (
    <div>
      <AdminNavigation />
      <Outlet />
    </div>
  );
};
