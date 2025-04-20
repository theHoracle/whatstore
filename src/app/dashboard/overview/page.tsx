import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard Overview | WhatStore",
  description: "Monitor your digital store's performance, track sales, and manage your products all in one place. Access real-time analytics and insights.",
  robots: "noindex, nofollow", // Dashboard pages should be private
  openGraph: {
    title: "WhatStore Vendor Dashboard",
    description: "Monitor your digital store's performance, track sales, and manage your products all in one place. Access real-time analytics and insights.",
    url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/overview`,
    images: [{
      url: process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE || "",
      width: 1200,
      height: 630,
      alt: "WhatStore Vendor Dashboard"
    }],
  }
};

export default function Page() {
  return (
    <div className="px-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
