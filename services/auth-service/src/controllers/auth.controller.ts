import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { signupService, loginService } from "../services/auth.service.js";
import { generateAccesToken } from "../utils/generateTokens.js";
// SIGNUP
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await signupService(name, email, password);

    return res.json({
      success: true,
      user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// LOGIN
export const login = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const data = await loginService(email, password);

    // cookie access token
    res.cookie("accessToken", data.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 mins
    });

    // refresh token in cookie

    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({
      success: true,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

export const me = async (req: any, res: any) => {
  try {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user data",
    });
  }
};

export const refresh = async (req: any, res: any) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "No refresh token provided",
      });
    }

    const decoded :any= jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    const accessToken = await generateAccesToken(decoded.userId, decoded.email);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    return res.json({
      success: true,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }
};

export const logout = async (
  req: any,
  res: any
) => {

  res.clearCookie("accessToken");

  res.clearCookie("refreshToken");

  return res.json({
    success: true,
    message: "Logged out",
  });

};