import React, { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim()) {
      onSendMessage(input.trim());
      setInput("");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 bg-primary">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
          className="flex-grow font-semibold"
        />
        <Button type="submit" size="icon" variant={"secondary"}>
          <Send className="size-4" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
