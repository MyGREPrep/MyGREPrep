import { create } from "zustand";

interface OtpState {
  otp: string;
  addOtp: (otp: string | null) => void;
}

const useOtp = create<OtpState>()((set) => ({
  otp: null,
  addOtp: (otp) => set((state) => ({ otp: otp })),
}));

export { useOtp };
