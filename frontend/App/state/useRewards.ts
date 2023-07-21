import { create } from "zustand";

interface RewardsState {
  rewards: number;
  addRewards: (rewards: number) => void;
}

const useRewards = create<RewardsState>()((set) => ({
  rewards: 0,
  addRewards: (rewards) => set((state) => ({ rewards })),
}));

export { useRewards };
