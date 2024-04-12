import '@/assets/globals.css';
import { GlobalContextProviders } from '@/components/GlobalContextProviders';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import { dayjs } from '@/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Etimo Activity Tracker',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-etimo">
      <body className={inter.className}>
        <GlobalContextProviders>
          <Navigation />
          {children}
        </GlobalContextProviders>
      </body>
    </html>
  );
}
