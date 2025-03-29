"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingVendorStore } from "../store";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  ACCEPTED_IMAGE_TYPES,
  onboardingVendor,
  OnboardingVendorSchema,
} from "../schema";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { createVendor } from "@/app/new-vendor/action";

const OnboardingForm = () => {
  const state = useOnboardingVendorStore((state) => state);
  const [preview, setPreview] = useState("/placeholder.png");
  const form = useForm<OnboardingVendorSchema>({
    resolver: zodResolver(onboardingVendor),
    defaultValues: {
      name: "",
      image: "",
      description: "", 
    },
  });

  const onSubmit = async (values: OnboardingVendorSchema) => {
    state.setData(values);
    const newStore = await createVendor({
      storeName: values.name,
      storeDescription: values.description,
      storeLogo: values.image[0],
    });
    console.log("New store created:", newStore); 
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 lg:gap-8 w-full">
          <FormField
            control={form.control}
            name="image"
            render={({ field: { onChange, ...field } }) => (
              <FormItem>
                <FormControl>
                  {/* Wrap the file input, image preview, and overlay in a label */}
                  <label className="relative group block w-48 h-48 rounded-full transition-all overflow-hidden border-2 border-gray-300 bg-gray-200 cursor-pointer">
                    <Input
                      type="file"
                      accept={ACCEPTED_IMAGE_TYPES.join(",")}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Update the react-hook-form value.
                          onChange(e.target.files);
                          // Create a preview URL for the image.
                          setPreview(URL.createObjectURL(file));
                        }
                      }}
                      {...field}
                      value={undefined}
                      className="hidden"
                    />
                    {/* Image preview covering the circle */}
                    <Image
                      fill
                      src={preview}
                      alt="Image uploaded"
                      className="object-cover object-center"
                    />
                    {/* Hover overlay */}
                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      Upload Image
                    </div>
                  </label>
                </FormControl>
                <FormDescription className="sr-only">
                  Upload an image (max 5MB, JPG/PNG/WebP)
                </FormDescription>
                <FormMessage className="text-center" />
              </FormItem>
            )}
          />
          <div className="flex-1">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Horacle Stores"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your brand name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Sells most affordable wears in Lagos."
                    {...field}
                  />
                </FormControl>
                <FormDescription>Describe your business.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="" size="lg" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export { OnboardingForm };
