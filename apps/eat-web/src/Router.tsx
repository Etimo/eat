import { Routes, Route, Navigate } from 'react-router';
import {
  AdminLayout,
  CompetitionsPage,
  CreateCompetition,
  HomePage,
  LoginPage,
  TeamsPage,
} from './pages';

export const Router = (): JSX.Element => {
  return (
    <Routes>
      {/* Public */}
      <Route path="login" element={<LoginPage />} />

      {/* Protected */}
      <Route index element={<HomePage />} />

      <Route path="admin">
        <Route element={<AdminLayout />}>
          <Route
            index
            element={<Navigate to="/admin/competitions" replace />}
          />
          <Route path="competitions" element={<CompetitionsPage />} />
          <Route path="teams" element={<TeamsPage />} />
        </Route>
      </Route>

      <Route index path="/competition" element={<CreateCompetition />} />
    </Routes>
  );
};
