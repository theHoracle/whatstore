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

  const { data: user } = useAuth();

  if(user && user.vendor) {
    router.push("/new-vendor/store");
    return null;
  }

  const onClick = async () => {
    try {
      setIsLoading(true);
      await createVendor();
      router.push("/new-vendor/store");
    } catch (error) {
      toast("Error", {
        description: "Failed to create vendor profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={onClick} 
      disabled={isLoading}
      className="w-full"
    >
      {isLoading ? "Creating..." : "Create Vendor Profile"}
    </Button>
  );
}
