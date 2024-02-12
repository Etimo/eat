import { HistoryScreen } from '@shared/views';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function History() {
  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <HistoryScreen />
    </SafeAreaView>
  );
}
