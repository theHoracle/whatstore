import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { ACCEPTED_IMAGE_TYPES, OnboardingVendorSchema } from "../schema";
import Image from "next/image";

const VendorBrand = ({
  form,
}: {
  form: UseFormReturn<OnboardingVendorSchema>;
}) => {
  return (
    <div className="flex flex-col md:flex-row">
      <FormField
        control={form.control}
        name="image"
        render={({ field: { onChange, value, ...field } }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <div className="relative rounded-full">
                <Input
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(e.target.files);
                      // uploadImage(file);
                    }
                  }}
                  {...field}
                  className="flex text-center absolute"
                />
                <Image
                  fill
                  src={value ?? "/placeholder.png"}
                  alt="Image uploaded"
                  className="object-cover object-center"
                />
              </div>
            </FormControl>
            <FormDescription>
              Upload an image (max 5MB, JPG/PNG/WebP)
            </FormDescription>

            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Horacle Stores" {...field} />
            </FormControl>
            <FormDescription>This is your brand name.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export { VendorBrand };
