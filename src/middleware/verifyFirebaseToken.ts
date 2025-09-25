import admin from "../config/firebaseAdmin";

export const verifyFirebaseToken = async (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No token provided in headers");
    return res.json({ error: "No token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    console.log("Verifying token...");
    const decodedToken = await admin.auth().verifyIdToken(token);
    console.log("Verified UID:", decodedToken.uid);
    req.user = decodedToken;
    next();
  } catch (err: any) {
    console.log("Error verifying token:", err);
    res.json({ error: "Invalid or expired token" });
  }
};
