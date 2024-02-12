import { Box } from '@gluestack-ui/themed';
import { FC, useEffect } from 'react';
import { Image } from 'expo-image';
import Reaniamted, {
  Easing,
  interpolate,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';

const assets = {
  icon: require('../../assets/etimo-icon.png'),
  text: require('../../assets/etimo-text-white.png'),
  splash: require('../../assets/splash.png'),
};

const ReanimatedImage = Reaniamted.createAnimatedComponent(Image);

type SplashAnimationProps = {
  setComplete: (value: boolean) => void;
};
export const SplashAnimation: FC<SplashAnimationProps> = ({ setComplete }) => {
  const progress = useSharedValue(0);
  const fadeOut = useSharedValue(1);

  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 700,
      easing: Easing.inOut(Easing.quad),
    });

    fadeOut.value = withDelay(
      1500,
      withTiming(
        0,
        { duration: 200, easing: Easing.inOut(Easing.quad) },
        () => {
          runOnJS(setComplete)(true);
        },
      ),
    );
  }, []);

  const width = useDerivedValue(() =>
    // Icon width: 47px, total logo width: 287px (with gap)
    interpolate(progress.value, [0, 1], [47, 287]),
  );
  const textOpacity = useDerivedValue(() =>
    // Trigger text animation after 20% of the icon anomation has played
    interpolate(progress.value, [0.2, 1], [0, 1]),
  );

  return (
    <>
      <StatusBar hidden />
      <Box bg="#2c3e50" h="$full" justifyContent="center" alignItems="center">
        <Reaniamted.View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 24,
            height: '100%',
            justifyContent: 'space-between',
            opacity: fadeOut,
            overflow: 'hidden',
            width,
          }}
        >
          <ReanimatedImage
            source={assets.icon}
            contentFit="contain"
            style={{
              height: 102,
              width: 47,
            }}
          />
          <ReanimatedImage
            source={assets.text}
            contentFit="contain"
            style={{
              height: 102,
              opacity: textOpacity,
              width: 216,
            }}
          />
        </Reaniamted.View>
      </Box>
    </>
  );
};
SplashAnimation.displayName = 'SplashAnimation';
