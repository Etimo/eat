import { useState } from 'react';
import { LoginButton } from './components/login-button';
import { trpc } from './trpc';
import { httpLink } from '@trpc/client';
import { QueryClient } from '@tanstack/react-query';

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
          },
        },
      }),
  );
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpLink({
          url: 'http://localhost:3100/trpc',
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'same-origin',
              // headers: getHeaders(),
            });
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <main className="text-4xl text-white h-dvh bg-gray-600 w-full">
        <LoginButton />
      </main>
    </trpc.Provider>
  );
}
