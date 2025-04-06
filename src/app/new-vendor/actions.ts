"use server"

import api from "@/lib/api/axios";

// Post endpoint to create a new vendor
type VendorData = {
    storeName: string;
    storeDescription: string;
    storeLogo: string;
}
export const createVendor = async (vendorData: VendorData) => {
    try {
        const res = await api.post("/vendor", vendorData);
        if (res.status === 200) {
            return { success: true, data: res.data };
        }
        throw new Error("Failed to create vendor");
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to create vendor"
        };
    }
}