import { HomeScreen } from '@shared/views';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SplashAnimation } from '../components/Splash';
// import { SplashScreen } from 'expo-router';
import { useEffect, useState } from 'react';

// SplashScreen.preventAutoHideAsync();

export default function Index() {
  const [complete, setComplete] = useState(false);
  return !complete ? (
    <SplashAnimation setComplete={setComplete} />
  ) : (
    <SafeAreaView>
      <StatusBar style="light" />
      <HomeScreen />
    </SafeAreaView>
  );
}
