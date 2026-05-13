

import express from "express";
import { generalQues } from "../controllers/generalQues.js";
const router = express.Router();

// general question
 router.post("/", generalQues)

 export default router