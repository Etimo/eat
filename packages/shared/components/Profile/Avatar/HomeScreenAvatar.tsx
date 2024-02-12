import { Avatar, AvatarFallbackText, Pressable } from '@gluestack-ui/themed';
import { ProfileSheet } from '@shared/components/Sheets/ProfileSheet';
import { FC, useRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

export const HomeScreenAvatar: FC = () => {
  const profileSheetRef = useRef<BottomSheetModal>(null);
  return (
    <>
      <Pressable
        onPress={() => {
          profileSheetRef.current?.present();
        }}
      >
        <Avatar bgColor="$darkBlue800">
          <AvatarFallbackText color="$white">André Hansson</AvatarFallbackText>
        </Avatar>
      </Pressable>

      <ProfileSheet ref={profileSheetRef} />
    </>
  );
};
HomeScreenAvatar.displayName = 'HomeScreenAvatar';
