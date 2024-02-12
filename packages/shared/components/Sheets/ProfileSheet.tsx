import {
  Avatar,
  AvatarFallbackText,
  Box,
  HStack,
  Heading,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { Ref, forwardRef, useMemo } from 'react';
import { BottomSheet } from './BottomSheet';
import { ProfileBadge } from '../Profile/ProfileBadge';
import { LogOutIcon } from 'lucide-react-native';
import { useDataStore, useUsersStore } from '@shared/zustand';

type ProfileSheetProps = {};

export const ProfileSheet = forwardRef<BottomSheetModal, ProfileSheetProps>(
  (_, ref: Ref<BottomSheetModal>) => {
    const { getCurrentUser } = useUsersStore();
    const { getAllUserActivities, getUserTotalMinutes } = useDataStore();

    const minuteCount = useMemo(
      () => getUserTotalMinutes(getCurrentUser()) + ' Minutes',
      [getUserTotalMinutes, getCurrentUser],
    );
    const activityCount = useMemo(
      () =>
        getAllUserActivities(getCurrentUser())
          .flatMap((x) => x.data)
          .flatMap((x) => x.activities).length + ' Activities',
      [getAllUserActivities, getCurrentUser],
    );

    return (
      <BottomSheet ref={ref} snapPoints={['25%', '80%']}>
        <VStack mt="$4" px="$4" space="md">
          <VStack alignItems="center" space="xs">
            <Avatar size="xl">
              <AvatarFallbackText>André Hansson</AvatarFallbackText>
            </Avatar>
            <Heading size="xl" color="$white">
              André Hansson
            </Heading>
          </VStack>
          <HStack justifyContent="space-between" w="$full" px="$2" gap="$6">
            <ProfileBadge variant="emerald" text={minuteCount} />
            <ProfileBadge variant="teal" text={activityCount} />
          </HStack>
        </VStack>
        <Box position="absolute" top={0} right={16}>
          <Pressable onPress={() => console.log('Log out user')}>
            <HStack space="xs" alignItems="center">
              <LogOutIcon color={'#ffffff'} size={20} />
              <Text color="$white">Log Out</Text>
            </HStack>
          </Pressable>
        </Box>
      </BottomSheet>
    );
  },
);
ProfileSheet.displayName = 'ProfileSheet';
