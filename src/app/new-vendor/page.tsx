import type { Metadata } from "next";
import { VendorInfoForm } from "@/features/vendors/onboarding/components/vendor-info-form";

export const metadata: Metadata = {
  title: "Become a Vendor | WhatStore",
  description: "Start selling your digital products on WhatStore. Easy onboarding process, secure payments, and powerful tools to grow your digital business.",
  robots: "index, follow",
  openGraph: {
    title: "Become a Digital Product Vendor | WhatStore",
    description: "Start selling your digital products on WhatStore. Easy onboarding process, secure payments, and powerful tools to grow your digital business.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/new-vendor`,
    images: [{
      url: process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE || "",
      width: 1200,
      height: 630,
      alt: "Become a WhatStore Vendor"
    }],
  }
};

export default function NewVendorPage() {
  return (
    <div className="relative h-lvh">
      <div className="bg-gradient-to-b from-black absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="relative z-10">
          <div className="max-w-4xl mx-auto p-1 md:p-4">
            <div className="backdrop-blur-xl mt-4 md:mt-10 lg:mt-14 rounded-xl border border-purple-500/20 shadow-[0_0_30px_rgba(139,92,246,0.2)]">
              <div className="relative px-8 py-2 md:py-6">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-t-xl" />
                <div className="relative">
                  <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
                    Welcome to Vendor Onboarding
                  </h1>
                </div>
              </div>
              <div className="p-1 md:p-6 lg:p-8 space-y-4">
                <VendorInfoForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
