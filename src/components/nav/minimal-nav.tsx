"use client";

import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export function MinimalNav() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6 h-16">
      <Link href="/" className="font-semibold text-xl">
        WhatStore
      </Link>
      
      <div className="flex items-center gap-2 md:ml-auto">
        <SignedIn>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/orders">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Orders
            </Link>
          </Button>
          <UserButton afterSignOutUrl="/"  />
        </SignedIn>

        <SignedOut>
          <Button variant="ghost" size="sm" asChild>
            <SignInButton />
          </Button>
          <Button size="sm" className="bg-primary hover:opacity-90" asChild>
            <SignUpButton />
          </Button>
        </SignedOut>
      </div>
    </div>
  );
}