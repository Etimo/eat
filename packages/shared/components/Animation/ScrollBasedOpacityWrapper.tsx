import { useScrollOffset } from '@shared/hooks';
import { FC, ReactNode } from 'react';
import Reanimated, {
  useSharedValue,
  useAnimatedReaction,
  withTiming,
} from 'react-native-reanimated';

type AnimatedTextWrapperProps = {
  children: ReactNode;
  invert?: boolean;
  trigger: number;
};
export const ScrollBasedOpacityWrapper: FC<AnimatedTextWrapperProps> = ({
  children,
  invert = false,
  trigger,
}) => {
  const { offset, scrollable } = useScrollOffset();
  const titleOpacity = useSharedValue(0);

  useAnimatedReaction(
    () => {
      if (scrollable && offset.value >= trigger) {
        return offset.value;
      }
      return 0;
    },
    (value) => {
      if (value) {
        titleOpacity.value = withTiming(+invert); // +true = 1 & +false = 0
      } else {
        titleOpacity.value = withTiming(+!invert); // +true = 1 & +false = 0
      }
    },
  );
  return (
    <Reanimated.View style={{ opacity: titleOpacity }}>
      {children}
    </Reanimated.View>
  );
};
ScrollBasedOpacityWrapper.displayName = 'ScrollBasedOpacityWrapper';
