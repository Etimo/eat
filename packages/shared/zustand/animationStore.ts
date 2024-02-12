import { Team } from '@shared/types';
import { create } from 'zustand';

interface AnimationState {
  titleScrollOffsetTrigger: number;
}

export const useAnimationStore = create<AnimationState>((set) => ({
  titleScrollOffsetTrigger: 15,
}));
