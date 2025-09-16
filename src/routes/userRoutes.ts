import { Router, Request, Response } from "express";
import User from "../models/User";

const router = Router();

// GET all users
router.get("/", async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
});

// GET single user
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Error fetching user" });
  }
});

// POST create user
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Error creating user" });
  }
});

// PUT update user
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch {
    res.status(500).json({ error: "Error updating user" });
  }
});

// DELETE user
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch {
    res.status(500).json({ error: "Error deleting user" });
  }
});

export default router;
