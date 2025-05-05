import type { Metadata } from "next";
import { FirstProductForm } from "@/features/vendors/onboarding/components/first-product-form";

export const metadata: Metadata = {
  title: "Add Your First Product or Service | WhatStore",
  description: "Start selling on WhatStore by adding your first item. List your products or services, set your pricing, and reach customers worldwide.",
  robots: "noindex, follow",
  openGraph: {
    title: "Add Your First Product or Service | WhatStore",
    description: "Start selling on WhatStore by adding your first item. List your products or services, set your pricing, and reach customers worldwide.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/new-vendor/product`,
    images: [{
      url: process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE || "",
      width: 1200,
      height: 630,
      alt: "Add Your First Item on WhatStore"
    }],
  }
};

export default function ProductPage() {
  return (
    <div className="relative h-lvh">
      <h1 className="text-4xl md:text-6xl capitalize leading-tight tracking-tight font-extrabold text-center">
        Add Your First Item
      </h1>
      <div className="p-1 md:p-6 lg:p-8">
        <FirstProductForm />
      </div>     
    </div>
  );
}
