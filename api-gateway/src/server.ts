import cookieParser from "cookie-parser";

import "dotenv/config";

import express from "express";
import cors from "cors";

import chatRoutes
from "./modules/chat/chat.routes.js";

import documentRoutes
from "./modules/documents/document.routes.js";

import folderRoutes from "./modules/folders/folder.routes.js";;

import authRoutes from "./modules/auth/auth.routes.js";

const app = express();
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());

app.use("/api/chat", chatRoutes);

app.use("/api/pdf", documentRoutes);

app.use("/api/folders", folderRoutes);

app.use("/api/auth",authRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running...");
});