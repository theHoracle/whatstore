import type { Metadata } from "next";
import { StorePreferencesForm } from "@/features/vendors/onboarding/components/store-preferences-form";

export const metadata: Metadata = {
  title: "Setup Your Store | WhatStore",
  description: "Configure your digital storefront on WhatStore. Customize your store settings, branding, and start selling your digital products.",
  robots: "noindex, follow",
  openGraph: {
    title: "Setup Your Digital Store | WhatStore",
    description: "Configure your digital storefront on WhatStore. Customize your store settings, branding, and start selling your digital products.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/new-vendor/store`,
    images: [{
      url: process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE || "",
      width: 1200,
      height: 630,
      alt: "Setup Your WhatStore Digital Store"
    }],
  }
};

export default function StorePage() {
  return (
    <div className="text-slate-100 container relative mx-auto px-4">
      <div className="max-w-[820px] mx-auto mb-12">
        <h1 className="text-4xl md:text-6xl lg:text-7xl capitalize leading-tight tracking-tight font-extrabold text-center">
          Setup your store
        </h1>
        <p className="mt-4 text-lg text-center text-slate-400 max-w-2xl mx-auto">
          Create your online store presence with a unique identity and essential details
        </p>
      </div>
      <StorePreferencesForm />
    </div>
  );
}
