'use client';
import { GluestackUI } from './gluestack-ui';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <GluestackUI>
      <SafeAreaProvider>{children}</SafeAreaProvider>
    </GluestackUI>
  );
}
