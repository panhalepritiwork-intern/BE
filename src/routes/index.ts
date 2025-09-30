import express from "express";
import authRoutes from "./authRoutes";
import taskRoutes from "./taskRoutes";
import userRoutes from "./userRoutes";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/users", userRoutes);

export default router;
