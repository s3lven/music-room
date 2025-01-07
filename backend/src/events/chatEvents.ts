import { Server, Socket } from "socket.io";

interface UserMessage {
  roomId: number;
  username: string;
  content: string;
}

type BuiltMessage = UserMessage & { createdAt: Date };

export const registerChatEvents = (io: Server, socket: Socket) => {
  // Handle new messages
  socket.on("message", ({ username, content, roomId }: UserMessage) => {
    console.log(`${username}: ${content}`);

    try {
      if (!content.trim()) return;

      const message: BuiltMessage = {
        roomId,
        content,
        username,
        createdAt: new Date(),
      };

      io.emit("message", message);
    } catch (error) {
      socket.emit("error", "Failed to send message");
    }
  });
};
