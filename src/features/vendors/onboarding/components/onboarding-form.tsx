"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { onboardingVendor, OnboardingVendorSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingVendorStore } from "../store";
import { motion, AnimatePresence } from "framer-motion";
import { VendorBrand } from "./vendor-branding";
import { BusinessInfo } from "./business-info";
import { Button } from "@/components/ui/button";

const OnboardingForm = () => {
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") || "1");
  const router = useRouter();

  const handleStepChange = (nextStep: number) => {
    if (nextStep < 3) {
      router.replace(`?step=${nextStep}`);
    }
  };

  const state = useOnboardingVendorStore((state) => state);

  const form = useForm<OnboardingVendorSchema>({
    resolver: zodResolver(onboardingVendor),
    defaultValues: {
      ...state,
    },
  });

  const onSubmit = (values: OnboardingVendorSchema) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: step === 1 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: step === 1 ? -50 : 50 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && <VendorBrand form={form} />}
            {step === 2 && <BusinessInfo form={form} />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          <Button disabled={step <= 1}>Prev</Button>
          {step < 2 ? (
            <Button onClick={() => handleStepChange(step + 1)}>Next</Button>
          ) : (
            <Button className="" type="submit">
              {" "}
              Submit{" "}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export { OnboardingForm };
