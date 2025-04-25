import { create } from 'zustand';

interface CurrentCompetitionStore {
  currentCompetition: string | null;
  setCurrentCompetition: (competitionId: string) => void;
}

export const useCurrentCompetition = create<CurrentCompetitionStore>()(
  (set) => ({
    currentCompetition: null as string | null,
    setCurrentCompetition: (competitionId: string) =>
      set({ currentCompetition: competitionId }),
  }),
);
