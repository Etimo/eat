import { useState } from 'react';
import { trpc } from './trpc';
import { httpLink } from '@trpc/client';
import { QueryClient } from '@tanstack/react-query';
import { Router } from './Router';
import { Navigation } from './components/navigation';

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
          url: 'http://localhost:3101/trpc',
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
    }),
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <main className="flex-1 flex flex-col">
        <Navigation />
        <Router />
      </main>
    </trpc.Provider>
  );
}
