import '@/assets/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { ClientSessionProvider, CurrentUserStoreProvider } from '@/providers';
import { getAuthSession } from '@/auth';
import { GlobalContextProviders } from '@/components/GlobalContextProviders';
import { Navigation } from '@/components/navigation';
import { redirect } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Etimo Activity Tracker',
  description: '',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getAuthSession();

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <html lang="en" className="bg-etimo">
      <body className={inter.className}>
        <ClientSessionProvider session={session}>
          <CurrentUserStoreProvider currentUser={{ ...session?.user }}>
            <GlobalContextProviders>
              <Navigation />
              {children}
            </GlobalContextProviders>
          </CurrentUserStoreProvider>
        </ClientSessionProvider>
      </body>
    </html>
  );
}
