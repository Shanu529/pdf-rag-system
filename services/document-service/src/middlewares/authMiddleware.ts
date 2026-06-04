import jwt from "jsonwebtoken";

const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    // const token = req.cookies.token;
    const token = req.cookies.accessToken;

    console.log("cookies:", req.cookies);
    console.log("token:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);

    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error,
    });
  }
};

export default authMiddleware;
