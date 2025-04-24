import { LoginButton } from '../components/login-button';
import etimoLogo from '../assets/Etimo-white.png';

export const LoginPage = () => {
  return (
    <main className="flex flex-col justify-center items-center gap-6 h-dvh">
      <div className="w-48 flex justify-center items-center">
        <img src={etimoLogo} alt="Etimo Logo" />
      </div>
      <LoginButton />
    </main>
  );
};
