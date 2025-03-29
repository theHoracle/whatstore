"use server"

import api from "@/lib/axios";
import { redirect } from "next/navigation";

// Post endpoint to create a new vendor
type VendorData = {
    storeName: string;
    storeDescription: string;
    storeLogo: string;
}
export const createVendor = async (vendorData: VendorData) => {
    const res = await api.post("/vendor", vendorData);
    if (res.status !== 200) {
        console.error("Error creating vendor:", res);
        throw new Error("Failed to create vendor");
    }
    if (res.status === 200) {
        redirect("/dashboard")
    }
    
}