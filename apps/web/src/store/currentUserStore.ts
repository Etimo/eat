import { createStore } from 'zustand/vanilla';

export type CurrentUserState = {
  currentUser?: {
    name?: string | null;
    email?: string | null;
    picture?: string | null;
  };
};

export type CurrentUserActions = {};

export type CurrentUserStore = CurrentUserState & CurrentUserActions;

export const defaultInitState: CurrentUserState = {
  currentUser: undefined,
};

export const createCurrentUserStore = (
  initState: CurrentUserState = defaultInitState,
) => {
  return createStore<CurrentUserStore>()((set) => ({
    ...initState,
  }));
};
