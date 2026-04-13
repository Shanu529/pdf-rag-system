import axios from "axios";
import express from "express";
import multer from "multer";

import { uplodepdf } from "../controllers/uplodeRoute.js";
const route = express.Router();
route.post("/test-python", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.PYTHON_ENDPOINT}/test-python`,
      {
        text: req.body.text,
      },
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// multer config

const upload = multer({ dest: "uploads/" });

route.post("/upload", upload.single("file"), uplodepdf);

export default route;
