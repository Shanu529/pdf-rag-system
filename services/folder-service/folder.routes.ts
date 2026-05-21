

import express from "express";
import {createFolder }from "./folder.controller.js";
import { deleteFolder } from "./folder.controller.js";

import { getFolders } from "./folder.controller.js";
import authMiddleware from  "../../middleware/auth.middleware.js";
const router  = express.Router();

router.post("/",authMiddleware, createFolder);
router.delete("/:id", authMiddleware, deleteFolder);
router.get("/",authMiddleware, getFolders);

export default router;