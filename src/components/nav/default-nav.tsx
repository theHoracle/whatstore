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
    <nav className="flex items-center h-16">
      <div className="flex-1"></div>
      <ul className="flex-[2]"></ul>
      <div className="flex-1 ">
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
