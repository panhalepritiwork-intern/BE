import { Request, Response } from "express";
import Task from "../models/Task";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const tasks = await Task.find({ user: userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const task = await Task.findOne({ _id: req.params.id, user: userId });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: "Invalid task ID" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const { title, description, status } = req.body;

    const task = new Task({
      title,
      description: description || "",
      status: status || "pending",
      user: userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const { title, description, status } = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      { title, description, status },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: userId });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task" });
  }
};
