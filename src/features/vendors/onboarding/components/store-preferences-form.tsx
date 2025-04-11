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
import { storePreferencesSchema, type StorePreferencesSchema } from "../schema";
import { toast } from "sonner";
import { createStore } from "../mutations";
import { useState } from "react";
import { uploadImage } from "@/utils/upload";
import Image from "next/image";

const basuUrl = process.env.NEXT_PUBLIC_BASE_URL  || "whatstore.com/store/";
export function StorePreferencesForm() {
  const router = useRouter();
  const [preview, setPreview] = useState<string>();
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<StorePreferencesSchema>({
    resolver: zodResolver(storePreferencesSchema),
    defaultValues: {
      storeName: "",
      storeUrl: "", 
      storeDescription: "",
      storeWhatsappContact: "",
      storeAddress: "",
    },
  });

  const onSubmit = async (data: StorePreferencesSchema) => {
    try {
      setIsUploading(true);
      const imageUrl = await uploadImage(
      data.storeLogo
      , 'store-logos');
      
      await createStore({
        ...data,
        storeLogo: imageUrl
      });
      
      router.push("/new-vendor/product");
    } catch (error) {
      toast("Error", {
        description: "Failed to create store. Please try again.",
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
          name="storeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your store name"
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
          name="storeUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store URL</FormLabel>
              <FormControl>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">
{basuUrl}
                  </span>
                  <Input
                    placeholder="your-store"
                    className="bg-slate-800"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storeLogo"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Store Logo</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  className="bg-slate-800"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange([file]);
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                  {...field}
                />
              </FormControl>
              {preview && (
                <div className="mt-2">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={100}
                    height={100}
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storeDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your store..."
                  className="bg-slate-800 min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storeWhatsappContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Contact</FormLabel>
              <FormControl>
                <Input
                  placeholder="+234..."
                  className="bg-slate-800"
                  type="tel"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storeAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Store Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your store's address..."
                  className="bg-slate-800"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="w-full"
          disabled={isUploading}
        >
          {isUploading ? "Creating Store..." : "Create Store"}
        </Button>
      </form>
    </Form>
  );
}
