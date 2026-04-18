import express from "express";
import multer from "multer";
import { uplodepdf } from "../controllers/uplodeRoute.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// upload PDF
router.post("/", upload.single("file"), uplodepdf);

export default router;