import { Box, Heading } from '@gluestack-ui/themed';
import { FC } from 'react';

type CardProps = {
  title?: string;
  children: React.ReactNode;
};

export const Card: FC<CardProps> = ({ children, title }) => {
  return (
    <Box flex={1} flexDirection="column">
      {title && (
        <Heading size="lg" color="$white" mb="$2">
          {title}
        </Heading>
      )}
      <Box
        flex={1}
        borderRadius="$xl"
        my="$0"
        py="$4"
        bg="#273646"
        softShadow="1"
      >
        {children}
      </Box>
    </Box>
  );
};
Card.displayName = 'Card';
