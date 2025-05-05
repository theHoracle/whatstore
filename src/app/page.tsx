import type { Metadata } from "next";
import Hero from "@/components/hero";
import Navbar from "@/components/nav/default-nav";
import { Features } from "@/components/sections/features";
import { AIFeatures } from "@/components/sections/ai-features";
import { Pricing } from "@/components/sections/pricing";
import { ShortFAQ } from "@/components/sections/short-faq";
import { Footer } from "@/components/sections/footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export const metadata: Metadata = {
  title: "WhatStore | Your Digital Marketplace Platform",
  description: "Launch your digital store on WhatStore. Sell software, digital art, e-books, and online courses with AI-powered tools and secure payment processing.",
  keywords: "digital marketplace, sell digital products, online store, e-commerce platform, digital downloads",
  openGraph: {
    title: "WhatStore | Your Digital Marketplace Platform",
    description: "Launch your digital store on WhatStore. Sell software, digital art, e-books, and online courses with AI-powered tools and secure payment processing.",
  }
};

export default function Home() { 
  return (
    <div className="relative min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="flex-1 w-full pt-24">
        <Hero />
        <div className="w-full space-y-24 md:space-y-32 lg:space-y-40 flex flex-col items-center">
          <MaxWidthWrapper className="flex flex-col items-center">
            <Features />
            <AIFeatures />
            <Pricing />
            <ShortFAQ />
          </MaxWidthWrapper>
        </div>
      </main>
      <Footer />
    </div>
  );
}
