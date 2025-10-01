import { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const requireRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const decodedUser = (req as any).user;
      if (!decodedUser) {
        return res.status(401).json({ message: "Unauthorized: No user in request" });
      }

      const uid = decodedUser.uid;
      if (!uid) {
        return res.status(400).json({ message: "Invalid token: no UID found" });
      }

      const dbUser = await User.findOne({ firebaseUid: uid });
      console.log("Decoded Firebase UID:", uid);
      console.log("DB User Found:", dbUser);

      if (!dbUser) {
        return res.status(404).json({ message: "User not found in DB" });
      }

      if (!roles.includes(dbUser.role)) {
        return res.status(403).json({ message: "Forbidden: role mismatch" });
      }

      next();
    } catch (err) {
      console.error("Error in requireRole middleware:", err);
      return res.status(500).json({ message: "Role verification failed" });
    }
  };
};
