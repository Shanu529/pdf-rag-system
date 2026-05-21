import type { Request, Response } from "express";

import { signupService, loginService } from "../services/auth.service.js";

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

    // cookie
    res.cookie("token", data.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({
      success: true,

      user: data.user,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};


export const me = async (req:any, res:any)=>{
  try {
    return res.status(200).json({
      success:true,
      user:req.user
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error fetching user data",
    });
  }
}