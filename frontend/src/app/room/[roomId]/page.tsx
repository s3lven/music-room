"use client";

import MessageInput from "@/components/chat/message-input";
import MessageList from "@/components/chat/message-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { socket } from "@/utils/socket";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import React from "react";

const RoomPage = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onMessageEvent = (message: string) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("message", onMessageEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("message", onMessageEvent);
    };
  }, []);

  const sendMessage = (content: string) => {
    socket.emit("message", content);
  };

  return (
    <Card className="w-full max-w-2xl font-mali">
      <CardHeader className="bg-primary">
        <CardTitle className="text-2xl font-bold text-primary-foreground">
          Music Chat Room
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Messages List */}
        <ScrollArea className="h-[400px] p-4">
          <MessageList messages={messages} />
        </ScrollArea>
        {/* Message Input */}
        <MessageInput onSendMessage={sendMessage} />
      </CardContent>
    </Card>
  );
};

export default RoomPage;
