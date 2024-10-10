import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function ChatLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
