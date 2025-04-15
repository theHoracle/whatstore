import { create } from "zustand";
import { persist } from "zustand/middleware";
import { VendorInfoSchema, StorePreferencesSchema, FirstProductSchema } from "./schema";

interface OnboardingState {
  step: number;
  storeId: number | null;
  vendorInfo: Partial<VendorInfoSchema>;
  storePreferences: Partial<StorePreferencesSchema>;
  firstProduct: Partial<FirstProductSchema>;
  isUploading: boolean;
  setVendorInfo: (data: Partial<VendorInfoSchema>) => void;
  setStorePreferences: (data: Partial<StorePreferencesSchema>) => void;
  setFirstProduct: (data: Partial<FirstProductSchema>) => void;
  setStep: (step: number) => void;
  setIsUploading: (isUploading: boolean) => void;
  setStoreId: (id: number) => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      step: 1,
      storeId: null,
      vendorInfo: {},
      storePreferences: {},
      firstProduct: {},
      isUploading: false,
      setVendorInfo: (data) => set((state) => ({ vendorInfo: { ...state.vendorInfo, ...data } })),
      setStorePreferences: (data) => set((state) => ({ storePreferences: { ...state.storePreferences, ...data } })),
      setFirstProduct: (data) => set((state) => ({ firstProduct: { ...state.firstProduct, ...data } })),
      setStep: (step) => set({ step }),
      setIsUploading: (isUploading) => set({ isUploading }),
      setStoreId: (id) => set({ storeId: id }),
    }),
    {
      name: "vendor-onboarding",
    }
  )
);
