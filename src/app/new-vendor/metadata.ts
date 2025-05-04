import type { Metadata } from "next"

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