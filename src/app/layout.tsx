import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ClientProvider from "@/components/providers/client-providers";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhatStore | Create and Grow Your Online Store",
  description: "Launch your online store on WhatStore. Sell products and services with powerful tools, secure payments, and reach customers worldwide.",
  keywords: "online store, e-commerce platform, sell online, marketplace, products, services, online business",
  authors: [{ name: "WhatStore" }],
  creator: "WhatStore",
  publisher: "WhatStore, Inc.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "WhatStore",
    title: "WhatStore | Create and Grow Your Online Store",
    description: "Launch your online store on WhatStore. Sell products and services with powerful tools, secure payments, and reach customers worldwide.",
    images: [{
      url: process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE || "",
      width: 1200,
      height: 630,
      alt: "WhatStore - Your Online Store Platform"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatStore | Create and Grow Your Online Store",
    description: "Launch your online store on WhatStore. Sell products and services with powerful tools, secure payments, and reach customers worldwide.",
    images: [process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE || ""],
    creator: "@whatstore"
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || ""),
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en" className="scroll-smooth">
        <body
          className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}
        >
          <ClientProvider>
            <div className="relative flex min-h-screen flex-col">
              {children}
            </div>
          </ClientProvider>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
