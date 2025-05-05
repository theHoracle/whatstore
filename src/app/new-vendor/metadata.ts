import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Become a Seller | WhatStore",
  description: "Start your online business on WhatStore. Easy setup, powerful tools, and everything you need to sell products and services online.",
  robots: "index, follow",
  openGraph: {
    title: "Start Selling on WhatStore",
    description: "Start your online business on WhatStore. Easy setup, powerful tools, and everything you need to sell products and services online.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/new-vendor`,
    images: [{
      url: process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE || "",
      width: 1200,
      height: 630,
      alt: "Become a WhatStore Seller"
    }],
  }
};