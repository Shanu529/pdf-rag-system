import cookieParser from "cookie-parser";

import "dotenv/config";

import express from "express";
import cors from "cors";

// import chatRoutes from "./modules/chat/chat.routes.js";

// import documentRoutes from "./modules/documents/document.routes.js";

// import folderRoutes from "./modules/folders/folder.routes.js";

// import authRoutes from "./modules/auth/auth.routes.js";

import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  "/api/chat",
  createProxyMiddleware({
    target: "http://localhost:5002", // change port to chat-service port
    changeOrigin: true,
  }),
);

app.use("/api/pdf",  createProxyMiddleware({
  target: "http://localhost:8000", // change port to pdf-service port
  changeOrigin: true,
}));

app.use("/api/folders", createProxyMiddleware({
  target: "http://localhost:5003", // change port to folder-service port
  changeOrigin: true,
}));

app.use("/api/auth", createProxyMiddleware({
  target: "http://localhost:5001", // auth-service port
  changeOrigin: true,
}));

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running...5000");
});
