import { useState } from 'react';
import { trpc } from './trpc';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './Router';
import { Navigation } from './components/navigation';
import { ModalProvider } from './providers/modal-provider';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
        httpBatchLink({
          url: `${backendUrl}/trpc`,
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
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <Router />
        </ModalProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
