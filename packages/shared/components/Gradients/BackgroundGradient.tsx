'use client';
import { Box } from '@gluestack-ui/themed';
import { LinearGradient } from './LinearGradient';
import { FC } from 'react';

export const BackgroundGradient: FC = () => {
  return (
    <Box position="absolute" bottom={0} top={0} left={0} right={0}>
      <Box
        h="100%"
        bg="white"
        sx={{
          _web: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          },
        }}
      >
        <LinearGradient
          flex={1}
          sx={{
            _web: {
              flex: 1,
            },
          }}
          colors={['#161f28', '#273646']}
          start={[0, 0.15]}
          end={[0, 1]}
        ></LinearGradient>
      </Box>
    </Box>
  );
};
BackgroundGradient.displayName = 'BackgroundGradient';
