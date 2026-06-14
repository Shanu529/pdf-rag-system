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
    console.log("STEP 1 ROUTE");
    next();
  },
  authMiddleware,

  (req, res, next) => {
    console.log("STEP 2 AUTH PASSED");
    next();
  },

  upload.single("file"),
   (req, res, next) => {
    console.log("STEP 3 MULTER PASSED");
    next();
  },

  uploadPDF
);

export default router;