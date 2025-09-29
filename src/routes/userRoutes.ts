import express from "express";
import { getUsers, getUserById, createUser } from "../controllers/userController";
import { verifyJWT } from "../middleware/verifyJWT";
import { requireRole } from "../middleware/requireRole";

const router = express.Router();

router.get("/", verifyJWT, requireRole(["admin"]), getUsers);
router.get("/:id", verifyJWT, getUserById);
router.post("/", verifyJWT, requireRole(["admin"]), createUser);

export default router;

