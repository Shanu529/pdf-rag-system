// services/auth-service/src/server.ts

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`AUTH SERVICE RUNNING ON ${process.env.PORT}`);
});
