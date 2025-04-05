import api from "@/lib/axios"
import supabase from "@/utils/supabase/server"

const bucketName = process.env.SUPABASE_BUCKET_NAME as string

export async function uploadImage(file: File, path: string) {
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(`${path}/${crypto.randomUUID()}`, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) { 
    console.error('Error uploading image:', error)
    throw error
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucketName)
    .getPublicUrl(data.path)

  return publicUrl
}

export async function uploadImages(files: File[], path: string) {
  const uploadPromises = files.map(file => uploadImage(file, path))
  return Promise.all(uploadPromises)
}

export interface CreateVendorInput {
  vendorInfo: {
    name: string;
    imageUrl: string;
    description: string;
  };
  storePreferences: {
    storeName: string;
    storeUrl: string;
    currency: string;
    country: string;
  };
  firstProduct: {
    name: string;
    description: string;
    price: number;
    imageUrls: string[];
  };
}

// This is the function you'll implement
export async function createVendor(input: CreateVendorInput) {
  // TODO: Implement your API call here
  const res = api.post('')
  throw new Error('Not implemented')
}
