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
  storeLogo: z
    .custom<File>((file) => file instanceof File, {
      message: "Store logo is required",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 5MB",
    })
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
  storeDescription: z.string().min(20),
  storeWhatsappContact: z.string(),
  storeAddress: z.string().min(5), 
});

// Form schemas for product and service
const productSchema = z.object({
  type: z.literal("product"),
  name: z.string().min(3, {
    message: "Product name must be at least 3 characters",
  }),
  description: z.string().min(20, {
    message: "Description should be at least 20 characters",
  }),
  price: z.number().min(0, {
    message: "Price must be a positive number",
  }),
  currency: z.string().default("NGN"),
  stock: z.number().min(0, {
    message: "Stock must be a positive number",
  }),
  category: z.string().min(1, {
    message: "Please select a category",
  }),
  images: z
    .custom<File[]>()
    .refine((files) => files?.length >= 1, "At least one image is required")
    .refine(
      (files) => files?.every((file) => file instanceof File),
      "Invalid file type"
    )
    .refine(
      (files) => files?.every((file) => file.size <= MAX_FILE_SIZE),
      "Max image size is 5MB"
    )
    .refine(
      (files) =>
        files?.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

const serviceSchema = z.object({
  type: z.literal("service"),
  name: z.string().min(3, {
    message: "Service name must be at least 3 characters",
  }),
  description: z.string().min(20, {
    message: "Description should be at least 20 characters",
  }),
  rate: z.number().min(0, {
    message: "Rate must be a positive number",
  }),
  currency: z.string().default("NGN"),
  image: z
    .custom<File>()
    .refine((file) => file instanceof File, "Invalid file type")
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "Max image size is 5MB"
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

export const firstProductSchema = z.discriminatedUnion("type", [
  productSchema,
  serviceSchema,
]);

export type FirstProductSchema = z.infer<typeof firstProductSchema>;

// API response types
export interface Product {
  id: number;
  storeId: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  currency: string;
  stock: number;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  storeId: number;
  name: string;
  description: string;
  imageUrl: string;
  rate: number;
  currency: string 
}

export type VendorInfoSchema = z.infer<typeof vendorInfoSchema>;
export type StorePreferencesSchema = z.infer<typeof storePreferencesSchema>;
