"use client"
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import { NavigationMenuBox } from "./nav-menu";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { cn } from "@/lib/utils";
import MaxWidthWrapper from "../MaxWidthWrapper";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className={cn(
        "hidden md:block fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[96%] rounded-full border bg-background/75 backdrop-blur-lg",
        "shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        "after:absolute after:inset-0 after:rounded-full after:border after:border-white/10 after:-z-10"
      )}>
        <MaxWidthWrapper className="flex h-14 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <h2 className="font-bold text-xl">WhatStore</h2>
          </div>

          {/* Desktop Navigation */}
          <div className="flex flex-1 justify-center max-w-2xl">
            <NavigationMenuBox />
          </div>
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-2">
            <SignedOut>
              <Button asChild size="sm" variant="outline" className="">
                <SignInButton />
              </Button>
              <Button asChild size="sm"  className="bg-primary hover:opacity-90">
                <SignUpButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </MaxWidthWrapper>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <MaxWidthWrapper className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-accent/50">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sheet-content">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="px-2">
                    <h2 className="font-bold text-xl">WhatStore</h2>
                  </div>
                  <div className="flex flex-col gap-2 px-2">
                    <Button variant="ghost" className="w-full justify-start hover:bg-accent/50" asChild>
                      <a href="/features">Features</a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start hover:bg-accent/50" asChild>
                      <a href="/pricing">Pricing</a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start hover:bg-accent/50" asChild>
                      <a href="/resources">Resources</a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start hover:bg-accent/50" asChild>
                      <a href="/blog">Blog</a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <h2 className="font-bold text-xl">WhatStore</h2>
          </div>

          {/* Mobile Auth */}
          <div className="flex items-center">
            <SignedOut>
              <Button asChild size="sm" variant="default" className="bg-primary hover:opacity-90">
                <SignUpButton />
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>
        </MaxWidthWrapper>
      </nav>
    </>
  );
};

export default Navbar;
