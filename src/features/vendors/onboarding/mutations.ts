import { apiClient } from "@/lib/api";
import { StorePreferencesSchema, FirstProductSchema } from "./schema";
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
  const res = await clientApi.post<StoreResponse>("/stores", {
    storeName: data.storeName,
    storeLogo: data.storeLogo,
    storeUrl: data.storeUrl,
    storeDescription: data.storeDescription,
    storeWhatsappContact: data.storeWhatsappContact,
    storeAddress: data.storeAddress
  });
  return res.data;
};

export const createProduct = async (storeId: number, data: Extract<FirstProductSchema, { type: "product" }>) => {
  const formData = new FormData();
  data.images.forEach((image) => {
    formData.append("images", image);
  });
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  formData.append("currency", data.currency);
  formData.append("stock", data.stock.toString());
  formData.append("category", data.category);
  formData.append("storeId", storeId.toString());

  const res = await clientApi.post(`/stores/${storeId}/products`, formData);
  return res.data;
};

export const createService = async (storeId: number, data: Extract<FirstProductSchema, { type: "service" }>) => {
  const formData = new FormData();
  formData.append("image", data.image);
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("rate", data.rate.toString());
  formData.append("currency", data.currency);
  formData.append("storeId", storeId.toString());

  const res = await clientApi.post(`/stores/${storeId}/services`, formData);
  return res.data;
};