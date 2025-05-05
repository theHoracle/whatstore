import { Vendor } from "@/types/api";

interface VendorState {
  vendor: Vendor | null;
  activeStoreId: number | null;
}

const isBrowser = typeof window !== 'undefined';

export const useVendorState = () => {
  const setVendorState = (vendor: Vendor) => {
    if (!isBrowser) return;
    
    const state = getVendorState();
    if (!state) {
      localStorage.setItem('vendor-state', JSON.stringify({ 
        vendor,
        activeStoreId: null,
      }));
      return;
    } 
    localStorage.setItem('vendor-state', JSON.stringify({ 
      ...state,
      vendor,
    }));
  };

  const setActiveStore = (storeId: number) => {
    if (!isBrowser) return;

    const state = getVendorState();
    if (state) {
      localStorage.setItem('vendor-state', JSON.stringify({ 
        ...state,
        activeStoreId: storeId 
      }));
    }
  };

  const getVendorState = (): VendorState | null => {
    if (!isBrowser) return null;
    
    const state = localStorage.getItem('vendor-state');
    if (state) {
      return JSON.parse(state);
    }
    return null;
  };

  const clearVendorState = () => {
    if (!isBrowser) return;
    localStorage.removeItem('vendor-state');
  };

  return {
    setVendorState,
    setActiveStore,
    getVendorState,
    clearVendorState,
  };
};