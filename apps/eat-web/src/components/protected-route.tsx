import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../hooks';

export const ProtectedRoute = () => {
  const { user } = useAuth();

  // If not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};
