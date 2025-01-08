import Room from "../models/room";

export const cleanupEmptyRoom = async (roomId: string) => {
  try {
    const room = await Room.findById(roomId);

    if (!room) return;

    if (room.activeUsers.length === 0) {
      await Room.findByIdAndDelete(roomId);

      console.log(`Room ${roomId} deleted successfully`);
    }
  } catch (error) {
    console.error("Error cleaning up room:", error);
  }
};
