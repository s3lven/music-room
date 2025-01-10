import { io } from "socket.io-client";

const URL =
  process.env.WS_URL

export const socket = io(URL, {
  autoConnect: false,
});
