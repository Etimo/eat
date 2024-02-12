import { StandingsScreen } from '@shared/views';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Standings() {
  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <StandingsScreen />
    </SafeAreaView>
  );
}
