'use client';
import { Box, HStack, Pressable } from '@gluestack-ui/themed';
import { BarChart2Icon } from 'lucide-react-native';
import { FC, useRef } from 'react';
import { useRouter } from 'solito/navigation';
import { AddActivityButton } from '../Graphics';
import { NewActivitySheet } from '../Sheets';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export const MobileMenu: FC = () => {
  const router = useRouter();

  const newActivitySheetRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <Box position="absolute" bottom={0} w="$full" px="$8" py="$4">
        <HStack justifyContent="space-between" alignItems="center" mb="$2">
          <Box w={32} />
          {/* <Pressable onPress={() => router.push('standings')}>
            <SettingsIcon size={32} color="white" />
          </Pressable> */}
          {/* <Pressable onPress={() => router.push('/new-activity')}> */}
          <Pressable
            onPress={() => {
              newActivitySheetRef.current?.present();
            }}
          >
            <AddActivityButton />
          </Pressable>
          <Pressable onPress={() => router.push('/standings')}>
            <BarChart2Icon size={32} color="white" />
          </Pressable>
        </HStack>
      </Box>
      <NewActivitySheet ref={newActivitySheetRef} />
    </>
  );
};
MobileMenu.displayName = 'MobileMenu';
