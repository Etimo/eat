import { Routes, Route } from 'react-router';
import { HomePage, LoginPage } from './pages';

export const Router = (): JSX.Element => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected */}
      <Route index path="/" element={<HomePage />} />

      {/* Catch all route */}
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Routes>
  );
};
