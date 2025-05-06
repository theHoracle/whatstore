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
import { useRouter, useSearchParams } from "next/navigation";
import { ImageIcon, ShoppingBag, Wrench } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { firstProductSchema, type FirstProductSchema } from "@/features/vendors/onboarding/schema";
import { createProduct, createService } from "@/features/vendors/onboarding/mutations";
import { uploadImage, uploadImages } from "@/utils/upload";
import { getToken } from "@/app/getjwt/actions";
import { useVendorState } from "@/hooks/use-vendor-state";

const CATEGORIES = [
  "Fashion & Accessories",
  "Electronics & Gadgets",
  "Home & Living",
  "Food & Beverages",
  "Health & Beauty",
  "Sports & Fitness",
  "Books & Media",
  "Art & Collectibles",
  "Professional Services",
  "Home Services",
  "Education & Courses",
  "Events & Entertainment",
  "Automotive",
  "Pet Supplies",
  "Other",
];

export default function NewItemPage() {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialItemType = searchParams.get("item") || "product";
  const { getVendorState } = useVendorState();
  const vendorState = getVendorState();
  const storeId = vendorState?.activeStoreId;

  const form = useForm<FirstProductSchema>({
    resolver: zodResolver(firstProductSchema),
    defaultValues: {
      type: initialItemType as "product" | "service",
      price: 0,
      stock: 0,
      currency: "NGN",
      category: "",
    },
    mode: "onChange", // Enable real-time validation
  });

  const type = form.watch("type");
  const formState = form.formState;
  const isValid = formState.isValid;

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (data: FirstProductSchema) => {
    if (!storeId) {
      toast.error("Store ID is required");
      return;
    }

    try {
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

        toast.success("Product created successfully!");
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

        toast.success("Service created successfully!");
      }

      router.push("/vendor/catalog/products");
    } catch (error) {
      console.error("Error creating product/service:", error);
      toast.error("Failed to create. Please try again.");
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Add New {type === "product" ? "Product" : "Service"}</h1>
            <p className="text-muted-foreground">
              Fill in the details below to add a new {type === "product" ? "product" : "service"} to your store
            </p>
          </div>
          <Button
            type="submit"
            form="item-form"
            className="hidden lg:flex"
            disabled={!isValid || form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center justify-center space-x-2">
                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Creating...</span>
              </span>
            ) : (
              `Create ${type === "product" ? "Product" : "Service"}`
            )}
          </Button>
        </div>

        <Form {...form}>
          <form id="item-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs
              value={type}
              defaultValue={initialItemType}
              className="w-full"
              onValueChange={(value) => form.setValue("type", value as "product" | "service")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="product">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Product
                </TabsTrigger>
                <TabsTrigger value="service">
                  <Wrench className="h-4 w-4 mr-2" />
                  Service
                </TabsTrigger>
              </TabsList>

              <TabsContent value="product">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Details Column */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium">Item Details</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tell customers about your product
                      </p>
                    </div>

                    <Card className="space-y-6 p-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter product name"
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
                                className="min-h-[160px] resize-none"
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
                                  <SelectTrigger>
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
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {CATEGORIES.map((category) => (
                                  <SelectItem
                                    key={category}
                                    value={category.toLowerCase()}
                                  >
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
                  </div>

                  {/* Image Upload Column */}
                  <Card className="lg:sticky lg:top-8 h-fit p-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-medium">Product Images</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          Show your product from different angles
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
                                      className="relative aspect-square cursor-pointer overflow-hidden rounded-xl border-2 border-dashed hover:border-primary transition-all duration-300"
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
                                          <ImageIcon className="w-6 h-6 text-muted-foreground" />
                                          <span className="text-xs text-muted-foreground">
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
                            <FormDescription className="text-center text-xs mt-3">
                              Add up to 4 images. PNG, JPG up to 5MB each.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                </div>
                <div className="mt-8 lg:hidden">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!isValid || form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Creating...</span>
                      </span>
                    ) : (
                      "Create Product"
                    )}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="service">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Details Column */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-lg font-medium">Item Details</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        Tell customers about your service
                      </p>
                    </div>

                    <Card className="space-y-6 p-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter service name"
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
                                className="min-h-[160px] resize-none"
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
                                  <SelectTrigger>
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
                  </div>

                  {/* Image Upload Column */}
                  <Card className="lg:sticky lg:top-8 h-fit p-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-lg font-medium">Service Image</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                          Add a photo that represents your service
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
                                  className="relative aspect-video cursor-pointer overflow-hidden rounded-xl border-2 border-dashed hover:border-primary transition-all duration-300"
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
                                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                                      <span className="text-sm text-muted-foreground">
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
                                    const files = Array.from(e.target.files || []);
                                    onChange(files[0]);
                                    setPreviews([URL.createObjectURL(files[0])]);
                                  }}
                                />
                              </div>
                            </FormControl>
                            <FormDescription className="text-center text-xs mt-3">
                              Add a cover image for your service. PNG, JPG up to 5MB.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Card>
                </div>
                <div className="mt-8 lg:hidden">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={!isValid || form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Creating...</span>
                      </span>
                    ) : (
                      "Create Service"
                    )}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </div>
    </div>
  );
}