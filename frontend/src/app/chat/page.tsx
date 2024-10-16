"use client";

import { Message } from "@/components/message";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { socket } from "@/lib/socket";
import { useEffect, useRef, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function Chat() {
  const { isSignedIn, user } = useUser();

  if (isSignedIn != undefined && !isSignedIn) {
    return redirect("/");
  }

  const searchParams = useSearchParams();
  const chatKey = searchParams.get("token");

  const [messages, setMessages] = useState<any[]>([]);
  const [messageToSend, setMessageToSend] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const allInitialMessagesQuery = useQuery(
    ["allInitialMessages"],
    async () => await api.get(`/key/message/${chatKey}`)
  );

  useEffect(() => {
    setMessages(allInitialMessagesQuery.data?.data as any);
  }, [allInitialMessagesQuery.data]);

  useEffect(() => {
    socket.emit("JoinGroup", {
      key: chatKey,
    });


    socket.on("ReceiveMessages", (value) => {
      setMessages((prev) => [...prev, ...value]);
    });

    socket.on("Error", (err) => {
      console.log(err);
    });

    return () => {
      socket.off("ReceiveMessages");
      socket.off("Error");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (allInitialMessagesQuery.isLoading) return <div>Loading...</div>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      key: chatKey,
      message: messageToSend,
      userName: user?.firstName,
      userId: user?.id,
    };

    socket.emit("SendMessage", data);

    setMessages([...messages, data]);

    setMessageToSend("");
  };

  return (
    <div className="flex h-[100vh] items-center justify-center">
      <Card className="w-3/5 h-4/5  flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-center">WillChat</CardTitle>
          <CardDescription className="text-center">
            Seja bem vindo ao seu chat privado aqui na WillChat
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 h-[600px] overflow-y-auto">
          {messages?.map((message: any, index: number) => (
            <Message key={index} user={message.userName}>{message.message}</Message>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter>
          <form className="flex w-full gap-16" onSubmit={handleSubmit}>
            <Input
              id="email"
              name="email"
              placeholder="Digite sua mensagem"
              className="w-full"
              value={messageToSend}
              onChange={(e) => setMessageToSend(e.target.value)}
            />
            <Button className="w-60">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
