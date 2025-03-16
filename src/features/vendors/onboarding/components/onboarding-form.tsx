"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { onboardingVendor, OnboardingVendorSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboardingVendorStore } from "../store";
import { motion, AnimatePresence } from "framer-motion";
import { VendorBrand } from "./vendor-branding";

const OnboardingForm = () => {
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") || 1);
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
        <div>
          {[1, 2].map((num) => (
            <div
              key={num}
              className={`h-2 w-full rounded-full ${step >= num ? "bg-primary" : "bg-muted"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: step === 1 ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: step === 1 ? -50 : 50 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && <VendorBrand form={form} />}
            {step === 2 && <AccountStep />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn-secondary"
            >
              Back
            </button>
          )}

          {step < 2 ? (
            <button
              type="button"
              onClick={() =>
                methods
                  .trigger()
                  .then((isValid) => isValid && setStep((s) => s + 1))
              }
              className="btn-primary ml-auto"
            >
              Next
            </button>
          ) : (
            <button type="submit" className="btn-primary">
              Submit
            </button>
          )}
        </div>
      </form>
    </Form>
  );
};

export { OnboardingForm };
