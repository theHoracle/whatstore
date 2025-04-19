import { createAuthenticatedClient } from "@/utils/supabase/client";
import { useUser } from "@clerk/nextjs";

const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME || "whatstore-images";

export async function uploadImage(file: File, path: string, token: string) {
  try {
    const supabase = await createAuthenticatedClient(token);
    
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`${path}-image`, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) { 
      console.error('Error uploading image:', error);
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
}

export async function uploadImages(files: File[], path: string, token: string) {
  try {
    const uploadPromises = files.map(file => uploadImage(file, path, token));
    return Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error in uploadImages:', error);
    throw error;
  }
}
