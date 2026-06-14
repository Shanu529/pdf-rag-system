// import cookieParser from "cookie-parser";

// import "dotenv/config";

// import express from "express";
// import cors from "cors";

// import axios from "axios";

// import { createProxyMiddleware } from "http-proxy-middleware";
// console.log("GATEWAY FILE LOADED");
// const app = express();
// app.use(cookieParser());

// app.use((req, res, next) => {
//   console.log("Incoming:", req.method, req.url);
//   next();
// });

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("MY GATEWAY");
// });

// app.get("/test", (req, res) => {
//   res.json({
//     message: "gateway working",
//   });
// });

// app.use((err: any, req: any, res: any, next: any) => {
//   console.error("JSON Parse Error:", err.message);
//   res.status(400).json({
//     error: err.message,
//   });
// });

// app.use((req, res, next) => {
//   console.log(req.method, req.url);
//   next();
// });
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   }),
// );

// app.use(
//   "/api/pdf",
//   createProxyMiddleware({
//     // target: "http://localhost:8000",
//     target: "http://ai-service:8000",
//     changeOrigin: true,
//   }),
// );

// app.use(
//   "/api/auth",
//   createProxyMiddleware({
//     // target: "http://localhost:5001/api/auth",
//     target: "http://auth-service:5001",
//     changeOrigin: true,
//   }),
// );

// app.use(
//   "/api/folders",
//   createProxyMiddleware({
//     // target: "http://localhost:5004/api/folders",
//     target: "http://folder-service:5004",
//     changeOrigin: true,
//   }),
// );

// app.use(
//   "/api/documents",
//   createProxyMiddleware({
//     target: "http://localhost:5003/api/documents",
//     // target: "http://document-service:5003",
//     changeOrigin: true,
//   }),
// );

// // app.use(
// //   "/api/chat",
// //   createProxyMiddleware({
// //     // target: "http://localhost:5002/api/chat",
// //     target: "http://chat-service:5002",
// //     changeOrigin: true,

// //   }),
// // );

// app.post("/api/chat/general", async (req, res) => {
//   try {
//     console.log("MANUAL FORWARD");

//     const response = await axios.post(
//       "http://chat-service:5002/api/chat/general",
//       req.body
//     );

//     console.log("RESPONSE RECEIVED");

//     res.json(response.data);
//   } catch (err: any) {
//     console.error(err.message);
//     res.status(500).json({
//       error: err.message,
//     });
//   }
// });

// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log("Server running on port", PORT);
// });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from "axios";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

const forwardRequest = async (
  req: express.Request,
  res: express.Response,
  serviceUrl: string,
) => {
  try {
    const response = await axios({
      method: req.method as any,
      url: `${serviceUrl}${req.originalUrl}`,
      data: req.body,
      params: req.query,

      headers: {
        cookie: req.headers.cookie || "",
      },

      validateStatus: () => true,
    });

    const cookies = response.headers["set-cookie"];

    if (cookies) {
      res.setHeader("set-cookie", cookies);
    }

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    console.error(error.message);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= AUTH =================

app.all("/api/auth/*path", (req, res) => {
  return forwardRequest(req, res, "http://auth-service:5001");
});

// ================= CHAT =================

app.all("/api/chat/*path", (req, res) => {
  return forwardRequest(req, res, "http://chat-service:5002");
});

// ================= FOLDERS =================

app.all("/api/folders/*path", (req, res) => {
  console.log("FOLDER REQUEST");
  console.log(req.method);
  console.log(req.originalUrl);
  return forwardRequest(req, res, "http://folder-service:5004");
});

// ================= DOCUMENTS =================

app.all("/api/documents/*path", (req, res) => {
  return forwardRequest(req, res, "http://document-service:5003");
});

// ================= AI SERVICE =================

app.all("/api/pdf/*path", async (req, res) => {
  try {
    const targetUrl =
      "http://ai-service:8000" + req.originalUrl.replace("/api/pdf", "");

    const response = await axios({
      method: req.method as any,
      url: targetUrl,
      data: req.body,
      params: req.query,
      validateStatus: () => true,
    });

    return res.status(response.status).json(response.data);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

// ================= HEALTH =================

app.get("/", (req, res) => {
  res.send("API Gateway Running");
});

app.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Gateway Working",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Gateway running on ${PORT}`);
});
