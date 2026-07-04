import { jwtVerify } from "jose";
import type { JWTPayload } from "jose";
import type { Request, Response, NextFunction } from "express";
import { secret } from "../config/jwt";

export interface CustomRequest extends Request {
  user?: JWTPayload;
}

const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      res
        .status(401)
        .json({ message: "token invalid, please provide a valid token" });
      return;
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      res
        .status(401)
        .json({ message: "token invalid, please provide a valid token" });
      return;
    }

    const { payload } = await jwtVerify(token, secret, {
      issuer: "urn:linksharing:issuer",
      audience: "urn:linksharing:audience",
    });

    req.user = payload;

    next();
  } catch (err: any) {
    res.status(401).json({ message: "Token Inválido" });
    console.error("Token inválido ou expirado:", err?.message || err);
  }
};

export default authMiddleware;
