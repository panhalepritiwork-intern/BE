import { Router, Request, Response } from "express";
import Task from "../models/Task";

const router = Router();

// GET all tasks (optional filter by userId)
router.get("/", async (req: Request, res: Response) => {
  const filter = req.query.userId ? { userId: req.query.userId } : {};
  const tasks = await Task.find(filter);
  res.json(tasks);
});

// GET single task
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch {
    res.status(500).json({ error: "Error fetching task" });
  }
});

// POST create task
router.post("/", async (req: Request, res: Response) => {
  try {
    const task = await Task.create(req.body);
    res.json(task);
  } catch {
    res.status(500).json({ error: "Error creating task" });
  }
});

// PUT update task
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch {
    res.status(500).json({ error: "Error updating task" });
  }
});

// DELETE task
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch {
    res.status(500).json({ error: "Error deleting task" });
  }
});

export default router;
