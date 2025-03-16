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
import { OnboardingVendorSchema } from "../schema";

const VendorBrand = ({
  form,
}: {
  form: UseFormReturn<OnboardingVendorSchema>;
}) => {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input placeholder="Horacle Stores" {...field} />
          </FormControl>
          <FormDescription>This is your brand :name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { VendorBrand };
