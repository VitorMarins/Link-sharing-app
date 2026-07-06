import type { Request, Response, NextFunction } from "express";

export const extractSubdomain = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const host = req.headers.host;

  if (!host) {
    req.subdomain = null;
    return next();
  }

  const parts = host.split(".");

  if (parts.length > 2) {
    req.subdomain = parts[0] || null;
  } else {
    req.subdomain = null;
  }

  next();
};
