import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function NewChatDialog() {
  const { getToken } = useAuth();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const createChatMutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      await api.post(
        "/key",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: async () => {
      setOpen(false);
      await queryClient.refetchQueries({
        queryKey: ["chat"],
        type: "all",
      });
    },
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant="default">New Chat</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar chat</DialogTitle>
          <DialogDescription>
            Clique no botão abaixo para criar um novo chat.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={createChatMutation.isLoading}
            onClick={() => createChatMutation.mutate()}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
