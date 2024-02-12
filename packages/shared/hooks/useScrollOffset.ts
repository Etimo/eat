import { ScrollViewOffsetContext } from '@shared/contexts';
import { useContext, useEffect } from 'react';
import { useScrollViewOffset } from 'react-native-reanimated';

export const useScrollOffset = () => {
  const context = useContext(ScrollViewOffsetContext);

  if (!context) {
    console.error(
      'A ScrollViewDistanceContext is required to use ScrollViewDistance',
    );
  }

  const { animatedRef, scrollable } = context;
  const offset = useScrollViewOffset(animatedRef);

  return {
    offset,
    scrollable,
  };
};
