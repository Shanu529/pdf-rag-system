

import prisma from "../lib/prisma.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";

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

  // generate jwt
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user,
  };
};
