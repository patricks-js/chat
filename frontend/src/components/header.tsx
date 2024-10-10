import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { ModeToggle } from "@/app/management/_components/toggle-theme";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-8">
      <h1>Chat Jala</h1>
      <div className="flex justify-center gap-2">
        <SignedOut>
          <SignInButton
            fallbackRedirectUrl="/management"
            forceRedirectUrl="/management"
          />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <ModeToggle />
      </div>
    </header>
  );
}
