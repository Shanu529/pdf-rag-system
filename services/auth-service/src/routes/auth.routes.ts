

import express from "express";
import { login, signup, refresh, me, logout} from "../controllers/auth.controller.js";

import authMiddleware from "./../middleware/auth.middleware.js";


const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/me",authMiddleware, me);

// Access Token  → short expiry
// Refresh Token → long expiry

router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;