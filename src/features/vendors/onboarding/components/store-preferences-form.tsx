"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { storePreferencesSchema, type StorePreferencesSchema } from "../schema";
import { toast } from "sonner";
import { createStore } from "../mutations";
import { useRef, useState, useCallback } from "react";
import { uploadImage } from "@/utils/upload";
import Image from "next/image";
import { ImageIcon, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import debounce from "lodash/debounce";
import clientApi from "@/lib/api/client";
import { AxiosError } from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "whatstore.com/store/";

export function StorePreferencesForm() {
  const router = useRouter();
  const [preview, setPreview] = useState<string>();
  const [isUploading, setIsUploading] = useState(false);
  const [isCheckingUrl, setIsCheckingUrl] = useState(false);
  const [isUrlAvailable, setIsUrlAvailable] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Create a debounced function to check URL availability
  const checkUrlAvailability = useCallback(
    debounce(async (url: string) => {
      if (!url) {
        setIsUrlAvailable(null);
        return;
      }

      setIsCheckingUrl(true);
      try {
        const res = await clientApi.get<{ available: boolean }>(`/stores/check-url?url=${url}`);
        
        // Backend returns 0 for available
        setIsUrlAvailable(res.data.available);
      } catch (error) {
        if(error instanceof AxiosError) {
          toast.error(error.message)
        }
        console.error('Error checking URL availability:', error);
        setIsUrlAvailable(null);
      } finally {
        setIsCheckingUrl(false);
      }
    }, 500),
    []
  );

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
    // Prevent submission if URL is not available
    if (!isUrlAvailable) {
      toast.error("Please choose a different store URL");
      return;
    }

    try {
      setIsUploading(true);
      const imageUrl = await uploadImage(data.storeLogo, "store-logos");

      await createStore({
        ...data,
        storeLogo: imageUrl,
      });

      router.push("/new-vendor/product");
    } catch (error) {
      toast.error("Failed to create store. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Store Branding Column */}
          <Card className="lg:sticky lg:top-8 h-fit p-6 bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium text-slate-200">Store Branding</h2>
                <p className="text-sm text-slate-400 mt-1">Add your {"store's"} logo and unique URL</p>
              </div>

              <FormField
                control={form.control}
                name="storeLogo"
                render={({ field: { onChange, value, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <div className="group">
                        <div 
                          role="button"
                          tabIndex={0}
                          onClick={handleImageClick}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              handleImageClick();
                            }
                          }}
                          className="relative aspect-square w-full max-w-[320px] mx-auto cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-slate-700/50 hover:border-cyan-400 transition-all duration-300 bg-gradient-to-br from-slate-800/50 to-slate-900/50"
                        >
                          {preview ? (
                            <>
                              <Image
                                src={preview}
                                alt="Store Logo"
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                                <span className="text-sm font-medium text-white bg-black/50 px-4 py-2 rounded-full">
                                  Change Logo
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                              <div className="p-4 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/30">
                                <ImageIcon className="w-8 h-8 text-cyan-400" />
                              </div>
                              <div className="text-center px-6">
                                <p className="text-sm font-medium text-slate-200">Upload Store Logo</p>
                                <p className="text-xs text-slate-400 mt-1.5">Click to browse</p>
                              </div>
                            </div>
                          )}
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange([file]);
                              setPreview(URL.createObjectURL(file));
                            }
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="text-center text-xs text-slate-500 mt-3">
                      Recommended: A square image in PNG or JPG format, at least 512x512px. Must be less than 5MB
                    </FormDescription>
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
                      <div className="flex items-center space-x-1 bg-slate-800/50 backdrop-blur-sm rounded-md border border-slate-700/50 px-2 py-1 hover:border-cyan-400 transition-colors">
                        <span className="text-slate-400 select-none shrink-0">{baseUrl}</span>
                        <Input
                          placeholder="store-name"
                          className="!bg-transparent text-xl ring-0 border-0 focus:ring-0 active:ring-0 outline-0 p-0"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            checkUrlAvailability(e.target.value);
                          }}
                        />
                        <div className="shrink-0 w-6">
                          {isCheckingUrl && (
                            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                          )}
                          {!isCheckingUrl && isUrlAvailable === true && (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          )}
                          {!isCheckingUrl && isUrlAvailable === false && (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription className="flex items-center gap-1">
                      {isUrlAvailable === false && (
                        <span className="text-red-400">This URL is already taken. Please choose another one.</span>
                      )}
                      {isUrlAvailable === true && (
                        <span className="text-green-400">This URL is available!</span>
                      )}
                      {isUrlAvailable === null && (
                        "This will be your store's unique web address"
                      )}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          {/* Store Details Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-slate-200">Store Information</h2>
              <p className="text-sm text-slate-400 mt-1">Tell customers about your store</p>
            </div>

            <Card className="space-y-6 p-6 bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <FormField
                control={form.control}
                name="storeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Store Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your store name"
                        className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-400 focus:border-purple-600 transition-colors"
                        {...field}
                      />
                    </FormControl>
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
                        className="bg-slate-800/50 backdrop-blur-sm min-h-[160px] border-slate-700/50 hover:border-cyan-400 focus:border-purple-600 transition-colors resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A brief description of what your store offers
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            <Card className="space-y-6 p-6 bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
              <div>
                <h3 className="text-sm font-medium text-slate-200">Contact Details</h3>
                <p className="text-xs text-slate-400 mt-1">How customers can reach you</p>
              </div>

              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="storeWhatsappContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WhatsApp Contact</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+234..."
                          type="tel"
                          className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-400 focus:border-purple-600 transition-colors"
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
                          className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-400 focus:border-purple-600 transition-colors resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </Card>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white font-medium h-12 rounded-lg shadow-lg hover:shadow-cyan-400/20 transition-all duration-300"
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
          </div>
        </div>
      </form>
    </Form>
  );
}
