"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { TableDemo } from "./_components/table";

export default function Management() {
  const { isSignedIn } = useUser();

  if (isSignedIn != undefined && !isSignedIn) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-center h-[100vh]">
      <div className="w-[80%]">
        <TableDemo />
      </div>
    </div>
  );
}
