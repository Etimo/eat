'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';

import { type CurrentUserStore, createCurrentUserStore } from '@/store';

export type CurrentUserStoreApi = ReturnType<typeof createCurrentUserStore>;

export const CurrentUserStoreContext = createContext<
  CurrentUserStoreApi | undefined
>(undefined);

export interface CurrentUserStoreProviderProps {
  currentUser?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  children: ReactNode;
}

export const CurrentUserStoreProvider = ({
  currentUser,
  children,
}: CurrentUserStoreProviderProps) => {
  const storeRef = useRef<CurrentUserStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createCurrentUserStore();
    storeRef.current.setState(() => ({ currentUser }));
  }

  return (
    <CurrentUserStoreContext.Provider value={storeRef.current}>
      {children}
    </CurrentUserStoreContext.Provider>
  );
};

export const useCurrentUserStore = <T,>(
  selector: (store: CurrentUserStore) => T,
): T => {
  const currentUserStoreContext = useContext(CurrentUserStoreContext);

  if (!currentUserStoreContext) {
    throw new Error(
      `useCurrentUserStore must be used within CurrentUserStoreProvider`,
    );
  }

  return useStore(currentUserStoreContext, selector);
};
