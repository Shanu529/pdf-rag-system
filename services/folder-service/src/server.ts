import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import folderRoute from "./routes/folder.routes.js"

import cors from "cors";
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

// api/folders/create
// api/folders/delete/:id
// api/folders/getFolders
// /api/folders/verify/:folderId
app.use("/api/folders", folderRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`folder service is running on ${PORT}`);
});
