"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { firstProductSchema, type FirstProductSchema } from "../schema";
import { useOnboardingStore } from "../store";
import { toast } from "sonner";
import { createVendor } from "../mutations";
import { uploadImages } from "@/utils/upload";

export function FirstProductForm() {
  const [previews, setPreviews] = useState<string[]>([]);
  const router = useRouter();
  const { setFirstProduct, setIsUploading, vendorInfo, storePreferences } = useOnboardingStore();

  const form = useForm<FirstProductSchema>({
    resolver: zodResolver(firstProductSchema),
    defaultValues: {
      price: 0,
      images: [],
    },
  });

  // Redirect if previous steps are not completed
  if (!vendorInfo.name || !storePreferences.storeName) {
    router.push("/new-vendor");
    return null;
  }


  const onSubmit = async (data: FirstProductSchema) => {
    try {
      setIsUploading(true);
      // Upload images and get URLs
      const imageUrls = await uploadImages(data.images, 'product-images') 
      
      router.push("/dashboard");
    } catch (error) {
      toast("Error", {
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter product name"
                  className="bg-slate-800"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="bg-slate-800"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Product Images</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  className="bg-slate-800"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    onChange(files);
                    setPreviews(
                      files.map((file) => URL.createObjectURL(file))
                    );
                  }}
                />
              </FormControl>
              {previews.length > 0 && (
                <div className="mt-2 flex gap-2 flex-wrap">
                  {previews.map((preview, index) => (
                    <Image
                      key={index}
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your product..."
                  className="bg-slate-800 min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="w-[49%]"
          >
            Back
          </Button>
          <Button type="submit" className="w-[49%]">
            Complete Setup
          </Button>
        </div>
      </form>
    </Form>
  );
}
