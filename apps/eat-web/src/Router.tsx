import { Routes, Route } from 'react-router';
import {
  AdminLayout,
  CompetitionsPage,
  CreateCompetition,
  HomePage,
  LoginPage,
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
          <Route path="competitions" element={<CompetitionsPage />} />
        </Route>
      </Route>

      <Route index path="/competition" element={<CreateCompetition />} />
    </Routes>
  );
};
