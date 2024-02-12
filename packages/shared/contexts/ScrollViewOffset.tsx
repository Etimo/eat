'use client';

import { FC, createContext } from 'react';
import Reanimated, { AnimatedRef } from 'react-native-reanimated';

type ScrollViewOffsetContextType = {
  animatedRef: AnimatedRef<Reanimated.ScrollView>;
  scrollable: boolean;
};

export const ScrollViewOffsetContext =
  createContext<ScrollViewOffsetContextType>(null as any);

type ScrollViewOffsetProviderProps = {
  children: React.ReactNode;
} & ScrollViewOffsetContextType;

export const ScrollViewOffsetProvider: FC<ScrollViewOffsetProviderProps> = ({
  children,
  animatedRef,
  scrollable,
}) => {
  return (
    <ScrollViewOffsetContext.Provider value={{ animatedRef, scrollable }}>
      {children}
    </ScrollViewOffsetContext.Provider>
  );
};
