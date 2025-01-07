import { Message } from "@/types";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

const MessageList = ({ messages, currentUser }: MessageListProps) => {
  return (
    <div className="space-y-4 overfloy-y-scroll">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 ${
            message.username === currentUser ? "justify-end" : "justify-start"
          }`}
        >
          {message.username !== currentUser && (
            <Avatar>
              <AvatarFallback>
                {message.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}
          <div
            className={`max-w-xs px-4 py-2 rounded-lg ${
              message.username === currentUser
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            }`}
          >
            <p className="font-semibold">{message.username}</p>
            <p>{message.content}</p>
          </div>
          {message.username === currentUser && (
            <Avatar>
              <AvatarFallback>{currentUser[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
