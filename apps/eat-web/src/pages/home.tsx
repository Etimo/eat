import { useAuth } from '../hooks';

export const HomePage = () => {
  const { logout } = useAuth();
  return (
    <div>
      Home
      <button onClick={logout}>Logout</button>
    </div>
  );
};
