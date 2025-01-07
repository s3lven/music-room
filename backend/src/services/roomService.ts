import Room from "../models/room";

export const createRoom = async ({
  name,
  createdBy,
}: {
  name: string;
  createdBy: string;
}) => {
  // Validate input
  if (!name || !createdBy) {
    throw new Error("Missing name field");
  }

  // Create room in database
  const room = await Room.create({
    name,
    createdBy,
    activeUsers: [
      {
        username: createdBy,
        joinedAt: new Date(),
      },
    ],
  });

  return room;
};
