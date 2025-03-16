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

const BusinessInfo = ({
  form,
}: {
  form: UseFormReturn<OnboardingVendorSchema>;
}) => {
  return (
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="John" {...field} />
          </FormControl>
          <FormDescription>This is your username.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { BusinessInfo };
