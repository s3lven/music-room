import { Server, Socket } from "socket.io";
import { registerChatEvents } from "../events/chatEvents";

import Room from "../models/room";

export const socketConfig = (io: Server) => {
  io.on("connection", async (socket: Socket) => {
    const allSockets = await io.fetchSockets();
    console.log("Total connections", allSockets.length);
    console.log(`New connection detected: ${socket.id}`);

    registerChatEvents(io, socket);

    // Handle disconnect -- page reload and back navigation
    socket.on("disconnect", async () => {
      console.log(`User ${socket.data.username} disconnected`);

      try {
        // Find the rooms the user is in
        const rooms = await Room.find({
          "activeUsers.username": socket.data.username,
        });

        // Remove them from the rooms they're in
        for (const room of rooms) {
          await Room.updateOne(
            { _id: room._id },
            {
              $pull: {
                activeUsers: { username: socket.data.username },
              },
            },
          );

          socket.leave(room._id.toString());

          // Notify others in room
          io.to(room._id.toString()).emit("message", {
            username: "ADMIN",
            content: `${socket.data.username} has disconnected from the room.`,
          });
        }
      } catch (error) {
        console.error("Error handling disconnect", error);
      }
    });
  });
};
