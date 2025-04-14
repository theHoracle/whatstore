import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const vendorInfoSchema = z.object({
  name: z.string().min(3, {
    message: "Brand name must be at least 3 letters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  description: z.string().min(20, {
    message: "Description should be at least 20 characters",
  }),
});

export const storePreferencesSchema = z.object({
  storeName: z.string().min(3),
  storeUrl: z.string().min(3),
  storeLogo: z.array(z.any())
    .length(1, "Please select exactly one image")
    .transform(files => files[0])
    .refine(
      (file) => file instanceof File,
      "Invalid file type"
    ).refine(
      (file: File) => file.size <= MAX_FILE_SIZE,
      "Max image size is 5MB"
    ).refine(
      (file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
  storeDescription: z.string().min(20),
  storeWhatsappContact: z.string(),
  storeAddress: z.string().min(5), 
});

export const firstProductSchema = z.object({
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters",
  }),
  description: z.string().min(20, {
    message: "Description should be at least 20 characters",
  }),
  price: z.number().min(0, {
    message: "Price must be a positive number",
  }),
  images: z
    .array(z.any())
    .min(1, "At least one image is required")
    .refine(
      (files) => files.every((file) => file instanceof File),
      "Invalid file type"
    )
    .refine(
      (files) => files.every((file: File) => file.size <= MAX_FILE_SIZE),
      "Max image size is 5MB"
    )
    .refine(
      (files) =>
        files.every((file: File) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

export type VendorInfoSchema = z.infer<typeof vendorInfoSchema>;
export type StorePreferencesSchema = z.infer<typeof storePreferencesSchema>;
export type FirstProductSchema = z.infer<typeof firstProductSchema>;
