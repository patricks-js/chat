"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { TableDemo } from "./_components/table";
import NewChatDialog from "./_components/new-chat-dialog";

export default function Management() {
  const { isSignedIn } = useUser();

  if (isSignedIn != undefined && !isSignedIn) {
    return redirect("/");
  }

  return (
    <div className="flex flex-col items-center h-[100vh]">
      <div className="w-[80%] space-y-9 border p-11 min-h-[80vh]">
        <div className="flex justify-end items-center">
          <NewChatDialog />
        </div>
        <TableDemo />
      </div>
    </div>
  );
}
