import supabase from "@/utils/supabase/server"

const bucketName = process.env.SUPABASE_BUCKET_NAME as string || "whatstore-images"

export async function uploadImage(file: File, path: string) {
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
}

export async function uploadImages(files: File[], path: string) {
  const uploadPromises = files.map(file => uploadImage(file, path))
  return Promise.all(uploadPromises)
}
