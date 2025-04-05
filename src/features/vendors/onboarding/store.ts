import { create } from "zustand";
import { persist } from "zustand/middleware";
import { VendorInfoSchema, StorePreferencesSchema, FirstProductSchema } from "./schema";

interface OnboardingState {
  step: number;
  vendorInfo: Partial<VendorInfoSchema>;
  storePreferences: Partial<StorePreferencesSchema>;
  firstProduct: Partial<FirstProductSchema>;
  isUploading: boolean;
  setVendorInfo: (data: Partial<VendorInfoSchema>) => void;
  setStorePreferences: (data: Partial<StorePreferencesSchema>) => void;
  setFirstProduct: (data: Partial<FirstProductSchema>) => void;
  setStep: (step: number) => void;
  setIsUploading: (isUploading: boolean) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: 1,
      vendorInfo: {},
      storePreferences: {},
      firstProduct: {},
      isUploading: false,
      setVendorInfo: (data) => set((state) => ({ vendorInfo: { ...state.vendorInfo, ...data } })),
      setStorePreferences: (data) => set((state) => ({ storePreferences: { ...state.storePreferences, ...data } })),
      setFirstProduct: (data) => set((state) => ({ firstProduct: { ...state.firstProduct, ...data } })),
      setStep: (step) => set({ step }),
      setIsUploading: (isUploading) => set({ isUploading }),
    }),
    {
      name: "vendor-onboarding",
    }
  )
);
