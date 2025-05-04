import { apiClient } from "@/lib/api";
import { FirstProductSchema } from "./schema";
import clientApi from "@/lib/api/client";

export interface CreateVendorInput {
  name: string;
  email: string;
  phone?: string;
  image: File;
  description: string;
}

export interface CreateStoreInput {
  storeName: string;
  storeLogo: string; // Changed from File to string since we're sending the URL
  storeUrl: string;
  storeDescription: string;
  storeWhatsappContact: string;
  storeAddress: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

interface StoreResponse {
  id: number;
  // ... other store fields
}

// Helper type for product data after image upload
type ProductData = {
  name: string;
  description: string;
  price: number;
  currency: string;
  stock: number;
  category: string;
  images: string[]; // URLs from Supabase storage
  storeId: number;
};

// Helper type for service data after image upload  
type ServiceData = {
  name: string;
  description: string;
  rate: number;
  currency: string;
  imageUrl: string; // Changed from image to match Service interface 
};

export async function createVendor() {  
  try {
    console.log('Initiating vendor creation...');
    const res = await apiClient.post<ApiResponse<any>>('/vendors', {});

    if (!res.data) {
      console.error('Invalid response format from API');
      throw new Error('Invalid server response');
    }

    if (res.status !== 201) {
      console.error('Error creating vendor:', { status: res.status, data: res.data });
      throw new Error(res.data?.message || 'Failed to create vendor');
    }

    console.log('Vendor created successfully:', res.data);
    return res.data;
  } catch (error) {
    console.error('Vendor creation failed:', error);
    if (error instanceof Error) {
      throw new Error(`Vendor creation failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred during vendor creation');
  }
}

export const createStore = async (data: CreateStoreInput) => {
  const res = await clientApi.post<StoreResponse>("/stores/create", {
    storeName: data.storeName,
    storeLogo: data.storeLogo,
    storeUrl: data.storeUrl,
    storeDescription: data.storeDescription,
    storeWhatsappContact: data.storeWhatsappContact,
    storeAddress: data.storeAddress
  });
  return res.data;
};

export const createProduct = async (storeId: number, data: ProductData) => {
  const res = await clientApi.post(`/stores/${storeId}/products`, {
    ...data,
    storeId
  });
  return res.data;
};

export const createService = async (storeId: number, data: ServiceData) => {
  const res = await clientApi.post(`/stores/${storeId}/services`, {
    ...data,
    storeId
  });
  return res.data;
};