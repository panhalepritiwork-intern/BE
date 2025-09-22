import { Request, Response, NextFunction } from "express";
import admin from "../config/firebaseAdmin";

export const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("No token found in request headers");
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Received token:", token.substring(0, 20) + "..."); // partial log

    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Token verified, UID:", decodedToken.uid);

    (req as any).user = decodedToken; // attach user info to request
    next();
  } catch (err) {
    console.error("Error verifying Firebase token:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
