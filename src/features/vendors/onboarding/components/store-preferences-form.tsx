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
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full max-w-4xl mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Header Section with Logo and Name */}
          <div className="flex items-start space-x-6">
            <div className="relative group">
              <FormField
                control={form.control}
                name="storeLogo"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative w-32 h-32">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 animate-pulse opacity-50 group-hover:opacity-100 transition-opacity" />
                        {preview ? (
                          <Image
                            src={preview}
                            alt="Store Logo"
                            width={128}
                            height={128}
                            className="rounded-full object-cover w-full h-full border-2 border-transparent group-hover:border-cyan-400 transition-all duration-300"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-slate-800 dark:bg-slate-700 flex items-center justify-center">
                            <span className="text-slate-400">Store Logo</span>
                          </div>
                        )}
                        <Input
                          type="file"
                          accept="image/*"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange([file]);
                              setPreview(URL.createObjectURL(file));
                            }
                          }}
                          {...field}
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 flex items-center justify-center transition-opacity">
                <span className="text-white text-sm">Store Image</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">Store Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your store name"
                        className="bg-slate-800/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-700 hover:border-cyan-400 focus:border-purple-600 transition-colors text-lg"
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
                    <FormLabel className="text-sm font-medium text-slate-400">Store URL</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2 bg-slate-800/50 dark:bg-slate-900/50 backdrop-blur-sm rounded-md border border-slate-700 px-3 py-2 hover:border-cyan-400 transition-colors">
                        <span className="text-slate-400">{basuUrl}</span>
                        <Input
                          placeholder="your-store"
                          className="bg-transparent border-0 focus:ring-0 p-0"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Description and Contact Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <FormField
              control={form.control}
              name="storeDescription"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-sm font-medium text-slate-400">Store Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your store..."
                      className="bg-slate-800/50 dark:bg-slate-900/50 backdrop-blur-sm min-h-[120px] border-slate-700 hover:border-cyan-400 focus:border-purple-600 transition-colors"
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
                  <FormLabel className="text-sm font-medium text-slate-400">WhatsApp Contact</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+234..."
                      className="bg-slate-800/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-700 hover:border-cyan-400 focus:border-purple-600 transition-colors"
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
                  <FormLabel className="text-sm font-medium text-slate-400">Store Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your store's address..."
                      className="bg-slate-800/50 dark:bg-slate-900/50 backdrop-blur-sm border-slate-700 hover:border-cyan-400 focus:border-purple-600 transition-colors"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-cyan-400/20 transition-all duration-300"
          disabled={isUploading}
        >
          {isUploading ? (
            <span className="flex items-center justify-center space-x-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating Store...</span>
            </span>
          ) : (
            "Create Store"
          )}
        </Button>
      </form>
    </Form>
  );
}
