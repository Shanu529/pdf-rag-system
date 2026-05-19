import express from "express";
import multer from "multer";

import {
  uploadPDF,
} from "./document.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/", authMiddleware,
  upload.single("file"),
  uploadPDF
);

export default router;