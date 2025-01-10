import { Server, Socket } from "socket.io";
import Room from "../models/room";

interface UserMessage {
  username: string;
  content: string;
}

type BuiltMessage = UserMessage & { createdAt: Date };

export const registerChatEvents = (io: Server, socket: Socket) => {
  // Handle new messages
  socket.on("message", async ({ username, content }: UserMessage) => {
    console.log(`${username}: ${content}`);

    try {
      if (!content.trim()) return;

      // Find the user's room
      const room = await Room.findOne({
        "activeUsers.username": username,
      }).select("_id");

      if (!room) {
        console.error(`No room found for user ${username}`);
        return;
      }

      const message: BuiltMessage = {
        content,
        username,
        createdAt: new Date(),
      };

      io.to(room._id.toString()).emit("message", message);
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

      socket.join(roomId);
      console.log("Rooms:", socket.rooms);

      // Tell user they have joined a new room
      socket.emit("message", {
        username: "ADMIN",
        content: `Welcome to the chat room, ${socket.data.username}!`,
      });

      // Notify others about new user
      socket.broadcast.to(roomId).emit("message", {
        username: "ADMIN",
        content: `${socket.data.username} has joined the room.`,
      });

      // TODO: Update any lists for user and others
    } catch (error) {
      console.error("Failed to join room:", error);
      socket.emit("error", "Failed to join room");
    }
  });

  // Handle leave
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
        },
      );
      await room.save();

      // Leave socket room
      socket.leave(roomId);

      // Notify others
      socket.to(roomId).emit("message", {
        username: "ADMIN",
        content: `User ${socket.data.username} has left the room.`,
      });
    } catch (error) {
      socket.emit("error", "Failed to leave room");
    }
  });
};
