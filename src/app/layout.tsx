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
  title: "WhatStore | Get your online store",
  description: "The best place to find the best vendors",
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
