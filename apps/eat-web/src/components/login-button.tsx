import { useAuth } from '../hooks';
import google from '../assets/google.svg';
import { Button } from './ui/button';

export const LoginButton = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <Button onClick={loginWithGoogle}>
      <img src={google} alt="Google" className="w-6 h-6" />
      <span className="text-lg">Logga in med Google</span>
    </Button>
  );
};
