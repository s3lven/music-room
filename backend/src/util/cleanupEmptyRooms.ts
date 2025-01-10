import Room from "../models/room";

export const cleanupEmptyRooms = async () => {
  try {
    const result = await Room.deleteMany({
      activeUsers: { $size: 0 },
    });

    console.log(`Removed ${result.deletedCount} empty room(s).`);
  } catch (error) {
    console.error("Error cleaning up rooms:", error);
  }
};
