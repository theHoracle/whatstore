import { redirect } from "next/navigation";
import { getServerSideUser } from "@/lib/api/server";
import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to prevent hydration mismatch
const VendorDashboardShell = dynamic(
  () => import("./_components/vendor-dashboard-shell"), 
  { ssr: false }
);

// Mock user for development purposes when API is not available
const mockVendorUser = {
  id: "mock-user-id",
  name: "Mock Vendor",
  email: "mock@example.com",
  vendor: {
    id: "mock-vendor-id",
    storeName: "Mock Digital Store",
    storeUrl: "mock-store",
    isVerified: true,
  }
};

export default async function VendorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    // Try to get the real user from the API
    const user = await getServerSideUser();
    
    // If no real user is found, use mock user in development
    const authUser = user || (process.env.NODE_ENV === 'development' ? mockVendorUser : null);
    
    if (!authUser) {
      redirect("/");
    } else if (!authUser.vendor) {
      redirect("/new-vendor");
    }
    
    return <VendorDashboardShell>{children}</VendorDashboardShell>;
  } catch (error) {
    console.error("Error in vendor layout:", error);
    
    // Use mock user in development
    if (process.env.NODE_ENV === 'development') {
      return <VendorDashboardShell>{children}</VendorDashboardShell>;
    }
    
    // Redirect to login in production
    redirect("/");
  }
} 