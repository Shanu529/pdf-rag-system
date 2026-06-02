import express from "express";
import dotenv from "dotenv";

import documentRoutes from "./routes/document.routes.js"

import cors from "cors";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// api/documents/upload
app.use("/api/documents", documentRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`document service is running on ${PORT}`);
});
