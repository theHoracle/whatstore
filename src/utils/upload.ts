import supabase from "@/utils/supabase/client"

const bucketName = process.env.NEXT_PUBLIC_SUPABASE_BUCKET_NAME || "whatstore-images"

export async function uploadImage(file: File, path: string) {
  try {
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(`${path}/${crypto.randomUUID()}`, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) { 
      console.error('Error uploading image:', error)
      throw error;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path)

    return publicUrl
  } catch (error) {
    console.error('Error in uploadImage:', error)
    throw error;
  }
}

export async function uploadImages(files: File[], path: string) {
  try {
    const uploadPromises = files.map(file => uploadImage(file, path))
    return Promise.all(uploadPromises)
  } catch (error) {
    console.error('Error in uploadImages:', error)
    throw error;
  }
}
