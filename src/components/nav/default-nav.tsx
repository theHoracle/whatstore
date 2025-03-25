import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <nav className="flex items-center h-16 w-full lg:px-20">
      <div className="flex-1">
        <h2 className="font-bold text-2xl leading-tight tracking-tighter">
          WhatStore
        </h2>
      </div>
      <ul className="flex-[2] flex justify-center space-x-8 ">
        <li>Home</li>
        <li>Vendors</li>
        <li>Contact</li>
      </ul>
      <div className="flex-1 flex justify-end">
        <SignedOut>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <SignInButton />
            </Button>
            <Button asChild>
              <SignUpButton />
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
