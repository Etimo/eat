import { Routes, Route } from 'react-router';
import { CreateCompetition, HomePage, LoginPage } from './pages';

export const Router = (): JSX.Element => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected */}
      <Route index path="/" element={<HomePage />} />

      <Route index path="/competition" element={<CreateCompetition />} />
      
    </Routes>
  );
};
