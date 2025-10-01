import express from "express";
import { 
  getUsers, 
  getUserById, 
  createUser, 
  setUserRole 
} from "../controllers/userController";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken";
import { requireRole } from "../middleware/requireRole";
import User from "../models/User";

const router = express.Router();

router.get("/", verifyFirebaseToken, requireRole(["admin"]), getUsers);
router.get("/:id", verifyFirebaseToken, getUserById);
router.post("/", verifyFirebaseToken, requireRole(["admin"]), createUser);
router.post("/set-role", verifyFirebaseToken, setUserRole);

router.post("/signup-store", verifyFirebaseToken, async (req, res) => {
  try {
    const { name, email } = req.body;
    const decodedUser = (req as any).user; 

    console.log("Decoded user in signup-store:", decodedUser);

    let user = await User.findOne({ firebaseUid: decodedUser.uid });

    if (!user) {
      user = new User({
        name,
        email: decodedUser.email || email, 
        role: "user",
        firebaseUid: decodedUser.uid,
      });
      await user.save();
    }

    res.status(201).json(user);
  } catch (err) {
    console.error("Error storing user from signup:", err);
    res.status(500).json({ error: "Could not store user" });
  }
});


router.get("/by-uid/:uid", verifyFirebaseToken, async (req, res) => {
  try {
    console.log("Incoming UID:", req.params.uid);

    const user = await User.findOne({ firebaseUid: req.params.uid.trim() });
    console.log("User found in DB:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Error fetching user by uid:", err);
    res.status(500).json({ message: "Error fetching user" });
  }
});

export default router;
