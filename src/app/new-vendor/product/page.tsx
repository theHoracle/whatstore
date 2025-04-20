import type { Metadata } from "next";
import { FirstProductForm } from "@/features/vendors/onboarding/components/first-product-form";

export const metadata: Metadata = {
  title: "Add Your First Product | WhatStore",
  description: "Start your digital store by adding your first product. Upload digital content, set pricing, and begin selling on WhatStore's marketplace.",
  robots: "noindex, follow",
  openGraph: {
    title: "Add Your First Digital Product | WhatStore",
    description: "Start your digital store by adding your first product. Upload digital content, set pricing, and begin selling on WhatStore's marketplace.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/new-vendor/product`,
    images: [{
      url: process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE || "",
      width: 1200,
      height: 630,
      alt: "Add Your First Product on WhatStore"
    }],
  }
};

export default function ProductPage() {
  return (
    <div className="relative h-lvh">
    
      <h1 className="text-4xl md:text-6xl capitalize leading-tight tracking-tight font-extrabold text-center">
           Add First Product to Your Store
      </h1>
     <div className="p-1 md:p-6 lg:p-8">
        <FirstProductForm />
      </div>     
    </div>
  );
}
