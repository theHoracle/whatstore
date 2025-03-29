import { z } from "zod";

const MAX_FILE_SIZE = 5000000; // 5MB
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const onboardingVendor = z.object({
  name: z.string().min(3, {
    message: "Brand name must be at least 3 letters.",
  }),
  image: z
    .any()
    .refine((files: File[]) => files?.length >= 1, "Image is required")
    .refine(
      (files: File[]) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max image size is 5MB",
    )
    .refine(
      (files: File[]) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported",
    ),
  description: z.string().min(20, {
    message: "Description should be at least 20 characters",
  }),
  
});

export type OnboardingVendorSchema = z.infer<typeof onboardingVendor>;
