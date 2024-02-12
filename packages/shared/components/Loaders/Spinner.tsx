import { FC, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import Reanimated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { Path, Svg } from 'react-native-svg';

type SpinnerProps = {
  size?: 'xs' | 'md' | 'lg';
};
export const Spinner: FC<SpinnerProps> = ({ size = 'md' }) => {
  const rotation = useSharedValue(0);
  const style = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotate: `${interpolate(rotation.value, [0, 1], [0, 360])}deg`,
        },
      ],
    }),
    [],
  );

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(1, { duration: 800, easing: Easing.linear }),
      -1,
    );
  });

  const s = useMemo(() => {
    switch (size) {
      case 'xs':
        return 24;
      case 'md':
        return 32;
      case 'lg':
        return 48;
    }
  }, [size]);

  return (
    <View style={{ width: s, height: s }}>
      <Reanimated.View style={style}>
        <Svg width={s} height={s} viewBox="0 0 24 24">
          <Path
            d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
            opacity=".25"
          />
          <Path
            fill="#22c55e"
            d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
          />
        </Svg>
      </Reanimated.View>
    </View>
  );
};
Spinner.displayName = 'Spinner';
