import { LoginButton } from './components/login-button';
import { useAuth } from './hooks';

export default function App() {
  const { user } = useAuth();

  console.log('user', user);

  return (
    <main className="text-4xl text-white h-dvh bg-gray-600 w-full">
      <LoginButton />
    </main>
  );
}
