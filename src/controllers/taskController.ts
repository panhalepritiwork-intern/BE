import Task from "../models/Task";

export const getTasks = async (req: any, res: any) => {
  try {
    console.log("Fetching tasks for user:", req.user.uid);
    const tasks = await Task.find({ user: req.user.uid });
    res.json(tasks);
  } catch (err: any) {
    console.log("Error in getTasks:", err);
    res.json({ error: "Could not fetch tasks" });
  }
};

export const getTaskById = async (req: any, res: any) => {
  try {
    console.log("Fetching single task:", req.params.id);
    const task = await Task.findOne({ _id: req.params.id, user: req.user.uid });
    if (!task) {
      return res.json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err: any) {
    console.log("Error in getTaskById:", err);
    res.json({ error: "Invalid task id" });
  }
};

export const createTask = async (req: any, res: any) => {
  try {
    console.log("Creating task for:", req.user.uid);
    const task = new Task({
      title: req.body.title,
      description: req.body.description || "",
      status: req.body.status || "pending",
      user: req.user.uid,
    });
    await task.save();
    res.json(task);
  } catch (err: any) {
    console.log("Error in createTask:", err);
    res.json({ error: "Something went wrong while creating task" });
  }
};

export const updateTask = async (req: any, res: any) => {
  try {
    console.log("Updating task:", req.params.id);
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
    console.log("Error in updateTask:", err);
    res.json({ error: "Could not update task" });
  }
};

export const deleteTask = async (req: any, res: any) => {
  try {
    console.log("Deleting task:", req.params.id);
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.uid,
    });
    if (!task) return res.json({ error: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (err: any) {
    console.log("Error in deleteTask:", err);
    res.json({ error: "Could not delete task" });
  }
};
