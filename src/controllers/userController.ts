import User from "../models/User";

export const getUsers = async (req: any, res: any) => {
  try {
    console.log("Fetching users...");
    const users = await User.find();
    res.json(users);
  } catch (err: any) {
    console.log("Error in getUsers:", err);
    res.json({ error: "Could not fetch users" });
  }
};

export const getUserById = async (req: any, res: any) => {
  try {
    console.log("Fetching user by id:", req.params.id);
    const user = await User.findById(req.params.id);
    if (!user) return res.json({ error: "User not found" });
    res.json(user);
  } catch (err: any) {
    console.log("Error in getUserById:", err);
    res.json({ error: "Invalid user id" });
  }
};

export const createUser = async (req: any, res: any) => {
  try {
    console.log("Creating user...");
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (err: any) {
    console.log("Error in createUser:", err);
    res.json({ error: "Could not create user" });
  }
};
