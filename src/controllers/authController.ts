import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

const SECRET = process.env.JWT_SECRET || "secret123";

export const loginWithJWT = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET,
      { expiresIn: "1h" }
    );

    return res.json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "error" });
  }
};
