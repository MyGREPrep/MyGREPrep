import { create } from "zustand";

interface EmailStateForChange {
  emailForChangePassword: string;
  addEmailForChangePassword: (emailForChangePassword: string | null) => void;
}

const useEmailForChangePass = create<EmailStateForChange>()((set) => ({
  emailForChangePassword: null,
  addEmailForChangePassword: (emailForChangePassword) =>
    set((state) => ({ emailForChangePassword: emailForChangePassword })),
}));

export { useEmailForChangePass };
