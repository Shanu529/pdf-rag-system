import express from "express";
import dotenv from "dotenv";

import documentRoutes from "./routes/document.routes.js";
import { pdfQueue } from "./queue/pdfQueue.js";
import cookieParser from "cookie-parser";

import cors from "cors";

import { connectProducer } from "./kafka/producer.js";

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// api/documents/upload
app.use("/api/documents", documentRoutes);

app.get("/test", (req, res) => {
  console.log("TEST HIT");
  res.send("WORKING");
});

app.get("/t", (req, res) => {
  console.log("T");
  res.send("t");
});

app.get("/queue-test", async (req, res) => {
  await pdfQueue.add("test-job", { name: "Test Job" });
  res.send("Job added to queue");
});

const startServer = async () => {
  await connectProducer();
  
  const PORT = process.env.PORT;

  // const PORT = 4004;
  app.listen(PORT, () => {
    console.log(`document service is running on ${PORT}`);
  });
};

startServer();
