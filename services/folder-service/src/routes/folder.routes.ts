

import express from "express";

import {createFolder }from "../controllers/folder.controller.js";
import { deleteFolder } from "../controllers/folder.controller.js";

import { getFolders } from "../controllers/folder.controller.js";
import authMiddleware from  "../middleware/authMiddleware.js";
const router  = express.Router();

router.post("/create",authMiddleware, createFolder);
router.delete("/delete/:id", authMiddleware, deleteFolder);
router.get("/getFolders",authMiddleware, getFolders);

export default router;