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

export default function Home() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Dados do formulário:");
  };

  return (
    <div className="flex h-[100vh] items-center justify-center">
      <Card className="w-3/5 h-4/5  flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-center">Chat da bahia</CardTitle>
          <CardDescription className="text-center">
            Chat destinado aos preguiçosos da jala university
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 h-[600px] overflow-y-auto">
          <Message>
            asadsdasasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </Message>
          <Message>
            asadsdasasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </Message>
          <Message>
            asadsdasasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          </Message>
        </CardContent>
        <CardFooter>
          <form className="flex w-full gap-16" onSubmit={handleSubmit}>
            <Input placeholder="Digite sua mensagem" className="w-full" />
            <Button className="w-60">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
