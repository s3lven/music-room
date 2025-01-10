import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { socketConfig } from "./config/socket";
import { databaseConfig } from "./config/database";
import roomRouter from "./routes/roomRoute";
import mongoose from "mongoose";
import cors from "cors";
import { cleanupEmptyRooms } from "./util/cleanupEmptyRooms";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Create an Express server to be shared with the same port as Socket.io
const expressServer = app.listen(port, () => {
  if (process.env.NODE_ENV === "production")
    console.log(`Server running on http://localhost:${port}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: [
      "https://music-room-frontend.onrender.com",
      "http://localhost:3001",
    ],
    methods: ["GET", "POST"],
  },
});

// Set configurations
socketConfig(io);
databaseConfig(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to the database");
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from the database");
});

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3001",
      "https://music-room-frontend.onrender.com",
    ],
    methods: ["GET", "POST"],
  }),
);

// Cleans up empty rooms in database every 5 minutes
setInterval(cleanupEmptyRooms, 5 * 60000);

// Routes
app.use("/api/v1/rooms", roomRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Music Chat" });
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});
