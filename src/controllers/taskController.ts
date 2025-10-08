import Task from "../models/Task";
import { generateTaskDescription } from "../services/geminiService"; 

export const getTasks = async (req: any, res: any) => {
  try {
    const tasks = await Task.find({ user: req.user.uid });
    res.json(tasks);
  } catch (err: any) {
    res.json({ error: "Could not fetch tasks" });
  }
};

export const getTaskById = async (req: any, res: any) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.uid });
    if (!task) {
      return res.json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err: any) {
    res.json({ error: "Invalid task id" });
  }
};

export const createTask = async (req: any, res: any) => {
  try {
    let { title, description, status } = req.body;

    if (!description || description.trim() === "") {
      description = await generateTaskDescription(title);
    }

    const task = new Task({
      title,
      description,
      status: status || "pending",
      user: req.user.uid,
    });

    await task.save();
    return res.status(201).json(task);
  } catch (err: any) {
    res.status(500).json({ error: "Something went wrong while creating task" });
  }
};

export const updateTask = async (req: any, res: any) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.uid },
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
      },
      { new: true }
    );
    if (!task) return res.json({ error: "Task not found" });
    res.json(task);
  } catch (err: any) {
    res.json({ error: "Could not update task" });
  }
};

export const deleteTask = async (req: any, res: any) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.uid,
    });
    if (!task) return res.json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err: any) {
    res.json({ error: "Could not delete task" });
  }
};
