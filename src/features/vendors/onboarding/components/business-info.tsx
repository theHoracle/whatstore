import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";

import { OnboardingVendorSchema } from "../schema";
import { Textarea } from "@/components/ui/textarea";

const BusinessInfo = ({
  form,
}: {
  form: UseFormReturn<OnboardingVendorSchema>;
}) => {
  return (
    <div>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="John" {...field} />
            </FormControl>
            <FormDescription>This is your username.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export { BusinessInfo };
