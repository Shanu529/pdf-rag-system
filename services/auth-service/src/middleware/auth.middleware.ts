import jwt from "jsonwebtoken";

const authMiddleware = (req :any, res :any, next :any) => {
  try {
    console.log("cookies:", req.cookies);

    const token = req.cookies.token;

    console.log("token:", token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    console.log("decoded:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default authMiddleware;
