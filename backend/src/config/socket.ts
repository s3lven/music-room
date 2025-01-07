import { Server, Socket } from "socket.io";

export const socketConfig = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on("message", (message: string) => {
      console.log(message);
      io.emit("message", message);
    });

    socket.on("disconnect", () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
};
