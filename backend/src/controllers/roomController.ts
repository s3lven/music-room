import { createRoom } from "../services/roomService";
import { Request, Response } from "express";

export const handleCreateRoom = async (req: Request, res: Response) => {
  console.info("Starting process to create a new room");
  // Verify request body
  const { name, createdBy } = req.body;
  console.log(name);
  console.log(createdBy);

  try {
    // Create new room in database
    const room = await createRoom({ name, createdBy });

    // Can emit to connected clients through socket.io (optional)

    res.status(201).json(room);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Failed to create room` });
  }
  console.info("Finished process to create a new room");
};
