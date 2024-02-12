import { Box, Heading } from '@gluestack-ui/themed';
import { FC } from 'react';
import { LinearGradient } from '../Gradients';

const variants: Record<'emerald' | 'teal', string[]> = {
  emerald: ['#10b981', '#047857'],
  teal: ['#14b8a6', '#0f766e'],
};

type ProfileBadgeProps = {
  variant: 'emerald' | 'teal';
  text: string;
};
export const ProfileBadge: FC<ProfileBadgeProps> = ({ text, variant }) => {
  return (
    <Box
      px="$2"
      py="$2"
      borderRadius="$full"
      flex={1}
      justifyContent="center"
      alignItems="center"
    >
      <LinearGradient
        flex={1}
        colors={variants[variant]}
        start={[0.4, 0.25]}
        end={[0.9, 1]}
        position="absolute"
        bottom={0}
        top={0}
        left={0}
        right={0}
        borderRadius="$full"
      ></LinearGradient>
      <Heading color="$white" lineHeight={0} size="lg">
        {text}
      </Heading>
    </Box>
  );
};
ProfileBadge.displayName = 'ProfileBadge';
