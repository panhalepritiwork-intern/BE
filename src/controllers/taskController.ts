import { Request, Response } from "express";
import Task from "../models/Task";

//Tasks for logged-in user
export const getTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid; // Firebase UID
    const tasks = await Task.find({ user: userId }); 
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

//Task by ID
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

//Create new task (attach Firebase UID)
export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const { title, status } = req.body;

    const task = new Task({
      title,
      status: status || "pending",
      user: userId,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

//Update task
export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.uid;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

//Delete task
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
