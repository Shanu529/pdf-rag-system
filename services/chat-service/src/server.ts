import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import routes
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(express.json());

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use((req, res, next) => {
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  console.log("CONTENT-TYPE:", req.headers["content-type"]);
  next();
});

// POST /api/chat/general
// POST /api/chat/query
app.use("/api/chat", chatRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Chat service running on port ${process.env.PORT}`);
});
