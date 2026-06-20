import { Server } from "socket.io";

let io: Server;

export const initSocket = (httpServer: any) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log("Client Connected:", socket.id);
  });
};

export const getIO = () => io;