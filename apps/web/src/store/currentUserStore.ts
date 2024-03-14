import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface CurrentUserState {
  currentUser: string;
  setCurrentUser: (id: string) => void;
}
export const useCurrentUserStore = create<CurrentUserState>()((set, get) => ({
  currentUser: '941a7069-ba45-4670-ab27-6411b9049441',
  setCurrentUser: (id) =>
    set({
      currentUser: id,
    }),
}));
