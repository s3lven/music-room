import { Server, Socket } from "socket.io";
import { registerChatEvents } from "../events/chatEvents";

import Room from "../models/room";
import { cleanupEmptyRoom } from "../util/cleanupEmptyRoom";

export const socketConfig = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`User ${socket.id} connected`);

    registerChatEvents(io, socket);

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
            }
          );

          socket.leave(room._id.toString());

          // Notify others in room
          io.to(room._id.toString()).emit("room:user_left", {
            username: socket.data.username,
          });

          // if (room.activeUsers.length === 0) {
          //   console.log(`Empty room detected:`, room.id);
          //   await cleanupEmptyRoom(room.id);
          // }
        }
      } catch (error) {
        console.error("Error handling disconnect", error);
      }
    });
  });
};
