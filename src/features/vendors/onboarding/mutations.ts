import { apiClient } from "@/lib/api";


export interface CreateVendorInput {
  name: string;
  email: string;
  phone?: string;
  image: File;
  description: string;
}

export interface CreateStoreInput {
  storeName: string;
  storeLogo: string;
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

export async function createStore(data: CreateStoreInput) {
  try {
    console.log('Initiating store creation...', { storeName: data.storeName });
    
    if (!data.storeName || !data.storeUrl) {
      throw new Error('Missing required store information');
    }

    const res = await apiClient.post<ApiResponse<any>>('/vendors/store', data);

    if (!res.data) {
      console.error('Invalid response format from API');
      throw new Error('Invalid server response');
    }

    if (res.status !== 201) {
      console.error('Error creating store:', { status: res.status, data: res.data });
      throw new Error(res.data?.message || 'Failed to create store');
    }

    console.log('Store created successfully:', res.data);
    return res.data;
  } catch (error) {
    console.error('Store creation failed:', error);
    if (error instanceof Error) {
      throw new Error(`Store creation failed: ${error.message}`);
    }
    throw new Error('An unexpected error occurred during store creation');
  }
}