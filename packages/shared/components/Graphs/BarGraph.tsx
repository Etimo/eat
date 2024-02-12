import { Box, HStack } from '@gluestack-ui/themed';
import { FC, useState } from 'react';
import { interpolate } from 'react-native-reanimated';
import { AnimatedBar } from '../Animation';
import { useUsersStore } from '@shared/zustand';

type BarGraphProps = {
  height: number;
  data: { value: number; label: string }[];
  hightlightLabel?: string;
};

const highlight = '#22c55e';
export const BarGraph: FC<BarGraphProps> = ({
  height,
  hightlightLabel,
  data,
}) => {
  return (
    <Box h={height}>
      <HStack h="$full" gap="$2">
        {data.map(({ value, label }, index) => {
          const max = Math.max(...data.map(({ value }) => value));
          const barHeight = interpolate(value, [0, max], [30, height]);
          return (
            <AnimatedBar
              maxGrowth={height}
              key={label + '-' + index}
              height={barHeight}
              value={value}
              label={label}
              color={label === hightlightLabel ? highlight : undefined}
            />
          );
        })}
      </HStack>
    </Box>
  );
};
BarGraph.displayName = 'BarGraph';
