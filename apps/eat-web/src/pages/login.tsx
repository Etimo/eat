import { LoginButton } from '../components/login-button';
import etimoLogo from '../assets/Etimo-white.png';
import { useAuth } from '@/hooks';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <main className="flex flex-col justify-center items-center gap-6 h-dvh">
      <div className="w-48 flex justify-center items-center">
        <img src={etimoLogo} alt="Etimo Logo" />
      </div>
      <LoginButton />
    </main>
  );
};
