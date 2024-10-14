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
import EditDialog from "./edit-dialog";
import { DeleteDialog } from "./delete-dialog";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
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

  const router = useRouter();

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
        {chatQuery.data?.data.map((invoice: any) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.userId}</TableCell>
            <TableCell>{invoice.key}</TableCell>
            <TableCell className="text-right">
              <Link href={`/chat?token=${invoice.id}`}>
                <Button variant="ghost">
                  <SquareArrowOutUpRight />
                </Button>
              </Link>
              <DeleteDialog />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
