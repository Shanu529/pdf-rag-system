import express from "express";
import { createServer } from "http";

import { initSocket } from "./socket.js";
import { startConsumer } from "./kafka/consumer.js";

const app = express();

const httpServer = createServer(app);

initSocket(httpServer);

const startServer = async () => {
  await startConsumer();

  httpServer.listen(5005, () => {
    console.log("Notification Service Running");
  });
};

startServer();