"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createVendor } from "../mutations";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export function VendorInfoForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { data: user } = useAuth();

  useEffect(() => {
    if (user?.vendor) {
      router.push("/new-vendor/store");
    }
  }, [user, router]);

  const onClick = async () => {
    try {
      setIsLoading(true);
      console.log("Starting vendor creation...");
      const result = await createVendor();
      console.log("Vendor creation successful:", result);
      router.push("/new-vendor/store");
    } catch (error: any) {
      console.error("Vendor creation error:", error);
      toast("Error", {
        description: error.message || "Failed to create vendor profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (user?.vendor) {
    return null;
  }

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
