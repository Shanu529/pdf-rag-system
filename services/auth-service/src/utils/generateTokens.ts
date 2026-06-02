import express from "express";

import jwt from "jsonwebtoken";

export const generateAccesToken = async (userId: any, email: any) => {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET as any, {
    expiresIn: "15m",
  });
};


export const generateRefreshToken = async (userId: any) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as any, {
    expiresIn: "7d",
  });
};
