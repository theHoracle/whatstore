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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { storePreferencesSchema, type StorePreferencesSchema } from "../schema";
import { useOnboardingStore } from "../store";
import { toast } from "sonner";

const CURRENCIES = [
  { label: "NGN - Nigerian Naira", value: "NGN" },
  { label: "USD - US Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "GBP - British Pound", value: "GBP" },
];

const COUNTRIES = [
    { label: "Nigeria", value: "NG" }, 
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "GB" },
 
  // we will more countries as needed
];

export function StorePreferencesForm() {
  const router = useRouter();
  const { setStorePreferences, setStep } = useOnboardingStore();

  const form = useForm<StorePreferencesSchema>({
    resolver: zodResolver(storePreferencesSchema),
    defaultValues: {
      currency: "NGN",
      country: "NG",
    },
  });

  const onSubmit = async (data: StorePreferencesSchema) => {
    try {
      setStorePreferences(data);
      setStep(3);
      router.push("/new-vendor/product");
    } catch (error) {
      toast("Error", {
        description: "Something went wrong. Please try again.",
      });
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
                  <span className="text-slate-400">whatstore.com/</span>
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
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-800">
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CURRENCIES.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-slate-800">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {COUNTRIES.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
            Continue to Add Product
          </Button>
        </div>
      </form>
    </Form>
  );
}
