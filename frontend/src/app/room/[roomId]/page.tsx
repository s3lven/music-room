"use client";

import MessageInput from "@/components/chat/message-input";
import MessageList from "@/components/chat/message-list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message } from "@/types";
import { socket } from "@/utils/socket";
import { use, useEffect, useState } from "react";

import React from "react";

const RoomPage = ({
  params,
  searchParams,
}: {
  params: Promise<{ roomId: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { username } = use(searchParams);
  const { roomId } = use(params);

  const [, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Handle room leave
    const leaveRoom = () => {
      if (socket.connected) {
        socket.emit("room:leave", {
          username,
          roomId,
        });
      }
    };

    const onConnect = () => {
      setIsConnected(true);
      socket.emit("room:join", {
        username,
        roomId,
      });
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log("I am disconnecting");
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);

      // Leave the room when component unmounts
      leaveRoom();
    };
  }, [params, roomId, username]);

  useEffect(() => {
    const onMessageEvent = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("message", onMessageEvent);

    return () => {
      socket.off("message", onMessageEvent);
    };
  }, []);

  if (!username) {
    console.error("There is no username!");
    return;
  }

  const sendMessage = (content: string) => {
    // Construct message object
    const message: Message = {
      username,
      content,
    };

    socket.emit("message", message);
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
          <MessageList messages={messages} currentUser={username} />
        </ScrollArea>
        {/* Message Input */}
        <MessageInput onSendMessage={sendMessage} />
      </CardContent>
    </Card>
  );
};

export default RoomPage;
