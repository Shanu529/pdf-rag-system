import cookieParser from "cookie-parser";

import jwt from "jsonwebtoken";

const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};


export default authMiddleware;