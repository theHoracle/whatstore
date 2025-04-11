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

export async function createVendor() {  
  const res = await apiClient.post('/vendors', {});

  if (res.status !== 201) {
    console.error('Error creating vendor:', res)
    throw new Error('Failed to create vendor')
  }
  console.log('Vendor created successfully:', res.data)
  return res.data
}

export async function createStore(data: CreateStoreInput) {
  const res = await apiClient.post('/vendors/store', data)
  if (res.status !== 201) {
    throw new Error('Failed to create store')
  }
  return res.data
}