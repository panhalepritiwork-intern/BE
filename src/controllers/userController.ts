import User from "../models/User";
import admin from "../config/firebaseAdmin";

export const getUsers = async (req: any, res: any) => {
  try {
    console.log("Fetching users...");
    const users = await User.find();
    res.json(users);
  } catch (err: any) {
    console.log("Error in getUsers:", err);
    res.status(500).json({ error: "Could not fetch users" });
  }
};

export const getUserById = async (req: any, res: any) => {
  try {
    console.log("Fetching user by id:", req.params.id);
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err: any) {
    console.log("Error in getUserById:", err);
    res.status(400).json({ error: "Invalid user id" });
  }
};

export const createUser = async (req: any, res: any) => {
  try {
    console.log("Creating user...");
    const { name, email, role, firebaseUid } = req.body;

    const user = new User({
      name,
      email,
      role: role || "user",
      firebaseUid, 
    });

    await user.save();
    res.status(201).json(user);
  } catch (err: any) {
    console.log("Error in createUser:", err);
    res.status(500).json({ error: "Could not create user" });
  }
};

export const setUserRole = async (req: any, res: any) => {
  try {
    const { uid, role } = req.body; 

    if (!uid || !role) {
      return res.status(400).json({ error: "uid and role are required" });
    }

    const dbUser = await User.findOne({ firebaseUid: uid });
    if (!dbUser) {
      return res.status(404).json({ error: "User not found in DB" });
    }

    await admin.auth().setCustomUserClaims(uid, { role });

    dbUser.role = role;
    await dbUser.save();

    res.json({
      message: `Role '${role}' assigned to user ${dbUser.email}`,
      user: dbUser,
    });
  } catch (err: any) {
    console.error("Error setting user role:", err);
    res.status(500).json({ error: "Could not set role" });
  }
};
