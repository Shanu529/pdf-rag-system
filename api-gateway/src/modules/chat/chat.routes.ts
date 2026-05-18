import express from "express";

import {
  askQuestion,
  generalQues,
} from "./chat.controller.js";

const router = express.Router();

router.post("/general", generalQues);

router.post("/query", askQuestion);

export default router;