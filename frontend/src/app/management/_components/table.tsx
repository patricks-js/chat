import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, SquareArrowOutUpRight, Trash } from "lucide-react";
import { DeleteDialog } from "./delete-dialog";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Link from "next/link";

const invoices = [
  {
    id: "INV001",
    userId: "Paid",
    key: "$250.00",
  },
  {
    id: "INV001",
    userId: "Paid",
    key: "$250.00",
  },
  {
    id: "INV001",
    userId: "Paid",
    key: "$250.00",
  },
  {
    id: "INV001",
    userId: "Paid",
    key: "$250.00",
  },
  {
    id: "INV001",
    userId: "Paid",
    key: "$250.00",
  },
  {
    id: "INV001",
    userId: "Paid",
    key: "$250.00",
  },
  {
    id: "INV001",
    userId: "Paid",
    key: "$250.00",
  },
];

export function TableDemo() {
  const { getToken } = useAuth();

  const chatQuery = useQuery(["chat"], async () =>
    api.get("/key", {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    })
  );

  if (chatQuery.isLoading) return <div>Loading...</div>;

  return (
    <Table>
      <TableCaption>A list of your chats.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>UserId</TableHead>
          <TableHead>Key</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {chatQuery.data?.data.map((chat: any) => (
          <TableRow key={chat.id}>
            <TableCell className="font-medium">{chat.id}</TableCell>
            <TableCell>{chat.userId}</TableCell>
            <TableCell>{chat.key}</TableCell>
            <TableCell className="text-right">
              <Link href={`/chat?token=${chat.id}`}>
                <Button variant="ghost">
                  <SquareArrowOutUpRight />
                </Button>
              </Link>
              <DeleteDialog chatKey={chat.key} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
