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
  title: "WhatStore | Digital Marketplace for Online Stores",
  description: "Create and manage your digital storefront on WhatStore. Sell software, digital art, e-books, and more with AI-powered tools and secure payment processing.",
  keywords: "digital marketplace, online store, e-commerce, digital products, software marketplace, digital downloads, AI-powered store",
  authors: [{ name: "WhatStore" }],
  creator: "WhatStore",
  publisher: "WhatStore, Inc.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "WhatStore",
    title: "WhatStore | Digital Marketplace for Online Stores",
    description: "Create and manage your digital storefront on WhatStore. Sell software, digital art, e-books, and more with AI-powered tools and secure payment processing.",
    images: [{
      url: process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE || "",
      width: 1200,
      height: 630,
      alt: "WhatStore - Your Digital Marketplace Platform"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatStore | Digital Marketplace for Online Stores",
    description: "Create and manage your digital storefront on WhatStore. Sell software, digital art, e-books, and more with AI-powered tools and secure payment processing.",
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
