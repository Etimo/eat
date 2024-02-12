import { Team } from '@shared/types';
import { create } from 'zustand';

interface TeamsState {
  teams: Team[];
  addTeam: (t: Team) => void;
  setTeams: (t: Team[]) => void;
}

export const useTeamsStore = create<TeamsState>((set) => ({
  teams: [
    { id: '1', name: 'v17 enjoyers' },
    { id: '2', name: 'Lorem Ipsum' },
    { id: '3', name: 'Padél pack' },
    { id: '4', name: 'Ctrl+Alt+Elite' },
    { id: '5', name: 'Erik, Björn, Johan och Julius' },
  ],
  addTeam: (t: Team) => set((state) => ({ teams: [...state.teams, t] })),
  setTeams: (t: Team[]) => set(() => ({ teams: t })),
  clearTeams: () => set({ teams: [] }),
}));
