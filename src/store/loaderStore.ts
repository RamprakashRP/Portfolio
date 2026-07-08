import { create } from 'zustand';

interface LoaderState {
  isLoading: boolean;
  finishLoading: () => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
  isLoading: true,
  finishLoading: () => set({ isLoading: false }),
}));
