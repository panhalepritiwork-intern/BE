import admin from "../config/firebaseAdmin";
import { Request, Response, NextFunction } from "express";

export const verifyFirebaseToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided in headers");
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    console.log("Verifying token...");
    const decodedToken = await admin.auth().verifyIdToken(token);

    console.log("Token verified:");
    console.log("UID:", decodedToken.uid);
    console.log("Email:", decodedToken.email);
    console.log("Claims:", decodedToken);

    (req as any).user = decodedToken;

    next();
  } catch (err: any) {
    console.error("Error verifying token:", err.message || err);
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
