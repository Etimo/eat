import { Routes, Route, Navigate } from 'react-router';
import { HomePage, LoginPage, TeamsPage } from './pages';
import { HTMLAttributes } from 'react';
import { useAuth } from './hooks';
import { Layout } from './layout';
import { AdminLayout, CompetitionPage, CompetitionsPage } from './pages/admin';
import { ActivitiesPage } from './pages/activities';

export const Router = (): JSX.Element => {
  const { isAuthenticated, isAdmin } = useAuth();
  return (
    <Routes>
      {/* Public */}
      <Route path="login" element={<LoginPage />} />

      {/* Protected */}
      <Route path="/">
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="activities" element={<ActivitiesPage />} />

          {isAdmin && (
            <Route path="admin">
              <Route
                element={
                  <ProtectedRoute>
                    <AdminLayout />
                  </ProtectedRoute>
                }
              >
                <Route
                  index
                  element={<Navigate to="/admin/competitions" replace />}
                />
                <Route path="competitions/:id" element={<CompetitionPage />} />
                <Route path="competitions" element={<CompetitionsPage />} />
                <Route path="teams" element={<TeamsPage />} />
              </Route>
            </Route>
          )}
        </Route>
      </Route>

      {/* 
      <Route index path="/competition" element={<CreateCompetition />} /> */}

      <Route
        path="*"
        element={
          isAuthenticated ? <Navigate to="/" /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

type ProtectedRouteProps = HTMLAttributes<HTMLDivElement> & {
  isAdmin?: boolean;
};
const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { children } = props;
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
