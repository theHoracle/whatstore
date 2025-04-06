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
  storeUrl: string;
  currency: string;
  country: string;
}

export async function createVendor() {  
  const res = await apiClient.post('/vendors', {})

  if (res.status !== 201) {
    throw new Error('Failed to create vendor')
  }
  return res.data
}

export async function createStore(data: CreateStoreInput) {
  const res = await apiClient.post('/vendors/store', data)
  if (res.status !== 201) {
    throw new Error('Failed to create store')
  }
  return res.data
}