
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


app.all("/api/auth/*path", (req, res) => {
  return forwardRequest(req, res, "http://auth-service:5001");
});

app.all("/api/chat/*path", (req, res) => {
  return forwardRequest(req, res, "http://chat-service:5002");
});


app.all("/api/folders/*path", (req, res) => {
  console.log("FOLDER REQUEST");
  console.log(req.method);
  console.log(req.originalUrl);
  return forwardRequest(req, res, "http://folder-service:5004");
});


app.all("/api/documents/*path", (req, res) => {
  return forwardRequest(req, res, "http://document-service:5003");
});


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
