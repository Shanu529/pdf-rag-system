import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import routes
import chatRoutes from "./routes/chat.routes.js";

const app = express();

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

// POST /api/chat/general
// POST /api/chat/query
app.use("/api/chat", chatRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Chat service running on port ${process.env.PORT}`);
});
