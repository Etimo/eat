import { Activity } from '@shared/types';
import { create } from 'zustand';

interface ActivitiesState {
  activities: Activity[];
}

export const useActivitiesStore = create<ActivitiesState>((set) => ({
  activities: [
    { id: '1', name: 'Klättring' },
    { id: '2', name: 'Löpning' },
    { id: '3', name: 'Promenad' },
    { id: '4', name: 'Racketsport' },
    { id: '5', name: 'Gym' },
    { id: '6', name: 'Simning' },
    { id: '7', name: 'Discgolf' },
    { id: '8', name: 'Cykling' },
    { id: '9', name: 'Dans' },
    { id: '10', name: 'Innebandy' },
    { id: '11', name: 'Volleyboll' },
  ],
}));
