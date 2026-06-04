import cookieParser from "cookie-parser";

import "dotenv/config";

import express from "express";
import cors from "cors";

import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// app.use(express.json());

app.use(
  "/api/pdf",
  createProxyMiddleware({
    target: "http://localhost:8000", // 
    changeOrigin: true,
  }),
);

app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:5001/api/auth",
    changeOrigin: true,
  }),
);

app.use(
  "/api/folders",
  createProxyMiddleware({
    target: "http://localhost:5004/api/folders",
    changeOrigin: true,
  }),
);

app.use(
  "/api/documents",
  createProxyMiddleware({
    target: "http://localhost:5003/api/documents",
    changeOrigin: true,
  }),
);

app.use(
  "/api/chat",
  createProxyMiddleware({
    target: "http://localhost:5002/api/chat",
    changeOrigin: true,
  }),
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log("Server running...5000");
});
