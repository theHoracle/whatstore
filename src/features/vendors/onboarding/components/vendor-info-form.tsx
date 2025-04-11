"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createVendor } from "../mutations";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export function VendorInfoForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: user, isLoading: isLoadingAuth } = useAuth();

  // Don't show anything while checking auth
  if (isLoadingAuth) {
    return null;
  }

  // If user already has a vendor profile, redirect
  if (user?.vendor) {
    router.push("/new-vendor/store");
    return null;
  }

  const onClick = async () => {
    if (!user) {
      toast.error("You must be logged in to create a vendor profile");
      return;
    }

    try {
      setIsLoading(true);
      const result = await createVendor();
      if (result) {
        router.push("/new-vendor/store");
      }
    } catch (error: any) {
      console.error("Vendor creation error:", error);
      toast.error(error.message || "Failed to create vendor profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={onClick} 
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-cyan-400 to-purple-600 hover:from-cyan-500 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-neon transition-all duration-300 border border-cyan-400/50"
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="animate-pulse">Creating...</span>
        </span>
      ) : (
        "Create Vendor Profile"
      )}
    </Button>
  );
}
