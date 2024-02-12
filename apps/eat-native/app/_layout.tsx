import { Stack } from 'expo-router';
import { Provider } from '@shared/provider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function Root() {
  return (
    <Provider>
      <BottomSheetModalProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="standings" options={{ headerShown: true }} /> */}
        </Stack>
      </BottomSheetModalProvider>
    </Provider>
  );
}
