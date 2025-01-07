import { Server, Socket } from "socket.io";
import { registerChatEvents } from "../events/chatEvents";

export const socketConfig = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`User ${socket.id} connected`);

    registerChatEvents(io, socket);

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
};
