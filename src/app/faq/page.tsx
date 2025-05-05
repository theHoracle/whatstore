import type { Metadata } from "next";
import Navbar from "@/components/nav/default-nav";
import { FAQ } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export const metadata: Metadata = {
  title: "FAQ - WhatStore",
  description: "Frequently asked questions about WhatStore's digital marketplace platform",
};

export default function FAQPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 w-full pt-24">
        <MaxWidthWrapper>
          <FAQ />
        </MaxWidthWrapper>
      </main>
      <Footer />
    </div>
  );
}