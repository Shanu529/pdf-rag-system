import express from "express";
import { askQuestion } from "../controllers/queryRoutes.js";

const router = express.Router();

// ask question
router.post("/", askQuestion);

export default router;