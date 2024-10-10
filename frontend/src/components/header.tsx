import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-8">
      <h1>Chat Jala</h1>
      <div>
        <SignedOut>
          <SignInButton
            fallbackRedirectUrl="/management"
            forceRedirectUrl="/management"
          />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
