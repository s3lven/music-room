import { Server, Socket } from "socket.io";
import Room from "../models/room";

interface UserMessage {
  username: string;
  content: string;
}

type BuiltMessage = UserMessage & { createdAt: Date };

export const registerChatEvents = (io: Server, socket: Socket) => {
  // Handle new messages
  socket.on("message", ({ username, content }: UserMessage) => {
    console.log(`${username}: ${content}`);

    try {
      if (!content.trim()) return;

      const message: BuiltMessage = {
        content,
        username,
        createdAt: new Date(),
      };

      io.emit("message", message);
    } catch (error) {
      socket.emit("error", "Failed to send message");
    }
  });

  // Handle join
  socket.on("room:join", async ({ username, roomId }) => {
    socket.data.username = username;

    try {
      // Validate input and if room exists in database
      if (!username || !roomId)
        throw new Error("room:join - missing username or roomId");

      // Search for room
      const room = await Room.findById(roomId);
      if (!room) throw new Error("room:join - room not found");

      // Add user to room
      if (!room.activeUsers.find((user) => user.username === username)) {
        console.log("Pushing new user:", socket.data.username);
        room.activeUsers.push({
          username,
          joinedAt: new Date(),
          socketId: socket.id,
        });

        await room.save();
      }

      // Tell user they have joined a new room
      socket.emit("message", {
        username: "ADMIN",
        content: `${username} has joined the room.`,
      });

      // TODO: Notify others about new user
      socket.to(roomId).emit("room:user_joined", {
        username,
      });

      // TODO: Update any lists for user and others
    } catch (error) {
      console.error("Failed to join room:", error);
      socket.emit("error", "Failed to join room");
    }
  });

  socket.on("room:leave", async ({ roomId }) => {
    console.log(`User ${socket.data.username} is leaving room ${roomId}`);

    try {
      const room = await Room.findById(roomId);

      if (!room) return;

      // Remove user from room
      await Room.updateOne(
        { _id: room._id },
        {
          $pull: {
            activeUsers: { username: socket.data.username },
          },
        }
      );
      await room.save();

      // Leave socket room
      socket.leave(roomId);

      // Notify others
      socket.to(roomId).emit("room:user_left", {
        username: socket.data.username,
      });

      // Check if room is now empty
      // if (room.activeUsers.length === 0) {
      //   await cleanupEmptyRoom(roomId);
      // }
    } catch (error) {
      socket.emit("error", "Failed to leave room");
    }
  });
};
