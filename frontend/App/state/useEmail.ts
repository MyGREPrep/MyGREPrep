import { create } from "zustand";

interface EmailState {
  email: string;
  addEmail: (email: string | null) => void;
}

const useEmail = create<EmailState>()((set) => ({
  email: null,
  addEmail: (email) => set((state) => ({ email: email })),
}));

export { useEmail };
