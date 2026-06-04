import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

import {
  generateAccesToken,
  generateRefreshToken,
} from "../utils/generateTokens.js";

export const signupService = async (
  name: string,
  email: string,
  password: string,
) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashPass = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPass,
    },
  });
  return user;
};

export const loginService = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const comparePass = await bcrypt.compare(password, user.password);

  if (!comparePass) {
    throw new Error("Invalid credentials");
  }

  // call acces token and refresh token

  const accessToken =  generateAccesToken(user.id, user.email);

  // const refreshToken = await generateRefreshToken(user.id);
  const refreshToken = generateRefreshToken(user.id, user.email);

  return {
    accessToken,
    refreshToken,
  };
};
