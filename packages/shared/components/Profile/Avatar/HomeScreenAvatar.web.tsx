import { Avatar, AvatarFallbackText } from '@gluestack-ui/themed';
import { FC } from 'react';

export const HomeScreenAvatar: FC = () => {
  return (
    <Avatar bgColor="$darkBlue800">
      <AvatarFallbackText color="$white">André Hansson</AvatarFallbackText>
    </Avatar>
  );
};
HomeScreenAvatar.displayName = 'HomeScreenAvatar';
