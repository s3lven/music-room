import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { socketConfig } from "./config/socket";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Create an Express server to be shared with the same port as Socker.io
const expressServer = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const io = new Server(expressServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production" ? false : ["http://localhost:3001"],
    methods: ["GET", "POST"],
  },
});

// Set configurations
socketConfig(io);

// Middlewares
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});
