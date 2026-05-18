

import express from "express";
import { login, signup } from "./auth.controller.js";
import { me } from "./auth.controller.js";
import authMiddleware from "../../middleware/auth.middleware.js";
const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/me",authMiddleware, me);
// router.post("/refresh",)
// router.post("/logout",)

export default router;