import { useAuth } from '../hooks';

export const LoginButton = () => {
  const { loginWithGoogle } = useAuth();

  return (
    <button
      onClick={loginWithGoogle}
      className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50"
    >
      <img src="/google-icon.svg" alt="Google" className="w-6 h-6" />
      Sign in with Google
    </button>
  );
};
