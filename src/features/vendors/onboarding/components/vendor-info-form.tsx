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
import { vendorInfoSchema, type VendorInfoSchema } from "../schema";
import { useOnboardingStore } from "../store";
import { toast } from "sonner";
import { uploadImage } from "../mutations";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/use-auth";


export function VendorInfoForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [preview, setPreview] = useState<string>();
  const { data: user } = useAuth();

  
  const router = useRouter();
  const { setVendorInfo, setStep, setIsUploading } = useOnboardingStore();

  const form = useForm<VendorInfoSchema>({
    resolver: zodResolver(vendorInfoSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
     // phone: user?.phone || "",
    },
  });

  const onSubmit = async (data: VendorInfoSchema) => {
    try {
      setIsUploading(true);
      const imageUrl = await uploadImage(data.image[0], 'vendor-logos');
      
      const vendorData = {
        ...data,
        image: imageUrl,
        isProfileUpdated: isEditing,
      };
      
      setVendorInfo(vendorData);
      setStep(2);
      router.push("/new-vendor/store");
    } catch (error) {
      toast("Error", {
        description: "Failed to upload image. Please try again.",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex justify-end items-center gap-2 mb-4">
          <label htmlFor="edit-mode" className="text-sm">Enable editing</label>
          <Switch
            id="edit-mode"
            checked={isEditing}
            onCheckedChange={setIsEditing}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={!isEditing}
                  className="bg-slate-800 disabled:opacity-70"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={!isEditing}
                  className="bg-slate-800 disabled:opacity-70"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone (Optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  disabled={!isEditing}
                  className="bg-slate-800 disabled:opacity-70"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem>
              <FormLabel>Brand Logo</FormLabel>
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your brand..."
                  className="bg-slate-800 min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Continue to Store Setup
        </Button>
      </form>
    </Form>
  );
}
