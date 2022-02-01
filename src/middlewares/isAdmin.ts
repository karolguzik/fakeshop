import { Request, Response, NextFunction } from "express";

export function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.session && req.session.isAdmin) {
    next();
    return;
  }

  res.status(403);
  res.send("Not permitted");
}
