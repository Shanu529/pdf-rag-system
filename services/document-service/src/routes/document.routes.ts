import express from "express";
import multer from "multer";

import {
  uploadPDF,
} from "../controllers/document.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

// router.post(
//   "/upload", authMiddleware,
//   upload.single("file"),
//   uploadPDF
// );

router.post(
  "/upload",
  (req, res, next) => {
    console.log("UPLOAD ROUTE HIT");
    next();
  },
  authMiddleware,
  upload.single("file"),
  uploadPDF
);

export default router;