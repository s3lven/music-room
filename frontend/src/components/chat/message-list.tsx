import React from "react";

interface MessageListProps {
  messages: string[];
}

const MessageList = ({ messages }: MessageListProps) => {
  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div key={message} className={`flex`}>
          <div className={`max-w-xs px-4 py-2 rounded-lg`}>
            <p className="font-semibold">User</p>
            <p>{message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
