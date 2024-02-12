import { Box, Text } from '@gluestack-ui/themed';
import { FC, useEffect, useMemo } from 'react';
import Reanimated, {
  Easing,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { AnimatedTextValue } from './AnimatedTextValue';

type AnimatedBarProps = {
  maxGrowth: number;
  height: number;
  label: string;
  value: number;
  color?: string;
};

export const AnimatedBar: FC<AnimatedBarProps> = ({
  height,
  maxGrowth,
  label,
  value,
  color,
}) => {
  const barTop = useSharedValue(maxGrowth);
  const barHeight = useSharedValue(0);

  const labelOpacity = useSharedValue(0);
  const valueOpacity = useSharedValue(0);

  const minutes = useSharedValue(0);

  useEffect(() => {
    barTop.value = withDelay(
      250,
      withTiming(maxGrowth - height, {
        duration: 500,
        easing: Easing.out(Easing.quad),
      }),
    );
    barHeight.value = withDelay(
      250,
      withTiming(height, { duration: 500, easing: Easing.out(Easing.quad) }),
    );

    minutes.value = withDelay(
      250,
      withTiming(value, {
        duration: 500,
        easing: Easing.linear,
      }),
    );

    labelOpacity.value = withDelay(
      500,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.quad) }),
    );
    valueOpacity.value = withDelay(
      250,
      withTiming(1, { duration: 500, easing: Easing.out(Easing.quad) }),
    );
  });

  const animatedText = useDerivedValue(() => `${minutes.value.toFixed(0)} min`);

  const backgroundColor = useMemo(() => {
    if (color) {
      return color;
    }
    if (height === 30) {
      return '#94a3b8'; // Gray
    }
    return '#f87171'; // Red
  }, [color, height]);

  return (
    <Box h="$full" flex={1} alignItems="center" position="relative">
      <Reanimated.View
        style={{
          backgroundColor,
          borderRadius: 8,
          width: '100%',
          height: barHeight,
          top: barTop,
        }}
      >
        {value > 0 && (
          <Reanimated.View
            style={{
              alignItems: 'center',
              paddingTop: 8,
              opacity: valueOpacity,
            }}
          >
            <Box sx={{ _web: { display: 'none' } }}>
              <AnimatedTextValue
                text={animatedText}
                style={{
                  fontSize: 14,
                  textAlign: 'center',
                }}
              />
            </Box>
            <Box
              sx={{ _ios: { display: 'none' }, _android: { display: 'none' } }}
            >
              <Text color="$white" textAlign="center" style={{ fontSize: 14 }}>
                {value} min
              </Text>
            </Box>
          </Reanimated.View>
        )}
      </Reanimated.View>
      <Reanimated.View
        style={{
          position: 'absolute',
          bottom: 4,
          opacity: labelOpacity,
          paddingHorizontal: 4,
          width: '100%',
        }}
      >
        <Text
          color="$white"
          fontWeight="$medium"
          numberOfLines={1}
          textAlign="center"
          sx={{
            _web: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          }}
        >
          {label}
        </Text>
      </Reanimated.View>
    </Box>
  );
};
AnimatedBar.displayName = 'AnimatedBar';
