import express from "express";

import jwt from "jsonwebtoken";

export const generateAccesToken = (userId: String, email: any) => {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET as any, {
    expiresIn: "15m",
  });
};


export const generateRefreshToken =  (userId: String, email:String) => {
  return jwt.sign({ userId , email}, process.env.JWT_REFRESH_SECRET as any, {
    expiresIn: "7d",
  });
};
// 