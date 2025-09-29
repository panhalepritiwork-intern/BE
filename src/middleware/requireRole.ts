import { Request, Response, NextFunction } from "express";

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const u = (req as any).user;
    if (!u) return res.status(401).json({ message: "unauth" });
    if (!roles.includes(u.role)) {
      return res.status(403).json({ message: "forbidden" });
    }
    next();
  };
};
