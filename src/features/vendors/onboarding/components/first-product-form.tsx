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
import { firstProductSchema, type FirstProductSchema } from "../schema";
import { toast } from "sonner";
import { createProduct, createService } from "../mutations";
import { useRef, useState } from "react";
import { uploadImage, uploadImages } from "@/utils/upload";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useOnboardingStore } from "../store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getToken } from "@/app/getjwt/actions";

const TEMP_CATEGORIES = [
  "Electronics",
  "Fashion",
  "Home & Garden",
  "Health & Beauty",
  "Sports",
  "Other",
];

export function FirstProductForm() {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { setFirstProduct, setIsUploading, storeId } = useOnboardingStore();

  const form = useForm<FirstProductSchema>({
    resolver: zodResolver(firstProductSchema),
    defaultValues: {
      type: "product",
      price: 0,
      stock: 0,
      currency: "NGN",
      category: ""
    },
  });

  const type = form.watch("type");

  const onSubmit = async (data: FirstProductSchema) => {
    if (!storeId) {
      toast.error("Store ID is required");
      return;
    }

    try {
      setIsUploading(true);

      // Get auth token for file uploads
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication required");
      }

      if (data.type === "product") {
        // Upload product images first
        const imageUrls = await uploadImages(data.images, "product-images", token);
        // Create product with uploaded URLs
        await createProduct(storeId, {
          name: data.name,
          description: data.description,
          price: data.price,
          currency: data.currency,
          stock: data.stock,
          category: data.category,
          images: imageUrls,
          storeId,
        });
      } else {
        // Upload service image
        const imageUrl = await uploadImage(data.image, "service-image", token);
        // Create service with uploaded URL
        await createService(storeId, {
          name: data.name,
          description: data.description,
          rate: data.rate,
          currency: data.currency,
          imageUrl, 
        });
      }

      router.push("/dashboard/overview");
    } catch (error) {
      console.error('Error creating product/service:', error);
      toast.error("Failed to create. Please try again.");
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="relative max-h-[calc(100vh-8rem)] overflow-y-auto space-y-8">
        <Tabs 
          value={type}
          defaultValue="product"
          className="w-full"
          onValueChange={(value) => form.setValue("type", value as "product" | "service")}
        >
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 p-1 rounded-lg">
            <TabsTrigger value="product">
              Product
            </TabsTrigger>
            <TabsTrigger value="service">
              Service
            </TabsTrigger>
          </TabsList>

          <TabsContent value="product" className="mt-6">
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Upload Column */}
              <Card className="lg:sticky lg:top-8 h-fit p-6 bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-slate-200">
                      Product Images
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Upload one or more images of your product
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormControl>
                          <div className="group grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-2 gap-4">
                              {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                  key={index}
                                  role="button"
                                  tabIndex={0}
                                  onClick={handleImageClick}
                                  className="relative aspect-square cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-slate-700/50 hover:border-cyan-400 transition-all duration-300 bg-gradient-to-br from-slate-800/50 to-slate-900/50"
                                >
                                  {previews[index] ? (
                                    <Image
                                      src={previews[index]}
                                      alt={`Product Image ${index + 1}`}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                      <ImageIcon className="w-6 h-6 text-cyan-400" />
                                      <span className="text-xs text-slate-400">
                                        Add Image
                                      </span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                            <input
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              ref={fileInputRef}
                              onChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                onChange(files);
                                setPreviews(
                                  files.map((file) => URL.createObjectURL(file))
                                );
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-center text-xs text-slate-500 mt-3">
                          Add up to 4 images. PNG, JPG up to 5MB each.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>

              {/* Details Column */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-slate-200">
                    Product Details
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Provide information about your product
                  </p>
                </div>

                <Card className="space-y-6 p-6 bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter product name"
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your product..."
                            className="bg-slate-800/50 backdrop-blur-sm min-h-[160px] border-slate-700/50 hover:border-cyan-400 focus:border-purple-600 transition-colors resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Include key features and specifications
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.00"
                              className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-400 focus:border-purple-600 transition-colors"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-400 focus:border-purple-600 transition-colors">
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="NGN">NGN</SelectItem>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-400 focus:border-purple-600 transition-colors"
                            {...field}
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          How many items do you have in stock?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-400 focus:border-purple-600 transition-colors">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TEMP_CATEGORIES.map((category) => (
                              <SelectItem key={category} value={category.toLowerCase()}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Card>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white font-medium h-12 rounded-lg shadow-lg hover:shadow-cyan-400/20 transition-all duration-300"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex items-center justify-center space-x-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating...</span>
                    </span>
                  ) : (
                    "Create Product"
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="service" className="mt-6">
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Upload Column */}
              <Card className="lg:sticky lg:top-8 h-fit p-6 bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-medium text-slate-200">
                      Service Image
                    </h2>
                    <p className="text-sm text-slate-400 mt-1">
                      Upload an image representing your service
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...field } }) => (
                      <FormItem>
                        <FormControl>
                          <div className="group grid grid-cols-1 gap-4">
                            <div
                              role="button"
                              tabIndex={0}
                              onClick={handleImageClick}
                              className="relative aspect-video cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-slate-700/50 hover:border-cyan-400 transition-all duration-300 bg-gradient-to-br from-slate-800/50 to-slate-900/50"
                            >
                              {previews[0] ? (
                                <Image
                                  src={previews[0]}
                                  alt="Service Image"
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                  <ImageIcon className="w-8 h-8 text-cyan-400" />
                                  <span className="text-sm text-slate-400">
                                    Upload Service Image
                                  </span>
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
                                  onChange(file);
                                  setPreviews([URL.createObjectURL(file)]);
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-center text-xs text-slate-500 mt-3">
                          Add a cover image for your service. PNG, JPG up to 5MB.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>

              {/* Details Column */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-slate-200">
                    Service Details
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    Describe your service offering
                  </p>
                </div>

                <Card className="space-y-6 p-6 bg-slate-900/50 border-slate-800/50 backdrop-blur-sm">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter service name"
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your service..."
                            className="bg-slate-800/50 backdrop-blur-sm min-h-[160px] border-slate-700/50 hover:border-cyan-400 focus:border-purple-600 transition-colors resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Explain what your service includes
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="rate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rate</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0.00"
                              className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-400 focus:border-purple-600 transition-colors"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="currency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Currency</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-400 focus:border-purple-600 transition-colors">
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="NGN">NGN</SelectItem>
                              <SelectItem value="USD">USD</SelectItem>
                              <SelectItem value="EUR">EUR</SelectItem>
                              <SelectItem value="GBP">GBP</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </Card>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white font-medium h-12 rounded-lg shadow-lg hover:shadow-cyan-400/20 transition-all duration-300"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <span className="flex items-center justify-center space-x-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Creating...</span>
                    </span>
                  ) : (
                    "Create Service"
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}
