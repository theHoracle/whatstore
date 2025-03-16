import { OnboardingVendorSchema } from "./schema";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type OnboardingVendorState = Partial<OnboardingVendorSchema> & {
  setData: (data: Partial<OnboardingVendorSchema>) => void;
};

export const useOnboardingVendorStore = create<OnboardingVendorState>()(
  persist(
    (set) => ({
      setData: (data) => set(data),
    }),
    {
      name: "vendor-onboarding",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
