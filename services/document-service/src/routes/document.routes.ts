import express from "express";
import multer from "multer";

import { uploadPDF } from "../controllers/document.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getDocumentsByFolder } from "../controllers/document.controller.js";
import prisma from "../lib/prisma.js";
const router = express.Router();
console.log("DOCUMENT ROUTES LOADED");
const upload = multer({
  dest: "uploads/",
});

router.post(
  "/upload",
  (req, res, next) => {
    next();
  },
  authMiddleware,
  upload.single("file"),
  uploadPDF,
);

router.get("/by-folder/:folderId", authMiddleware, getDocumentsByFolder);

router.get("/all", async (req, res) => {
  const docs = await prisma.document.findMany();

  res.json(docs);
});

export default router;
