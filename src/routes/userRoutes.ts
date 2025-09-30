import express from "express";
import { getUsers, getUserById, createUser, setUserRole } from "../controllers/userController";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken";
import { requireRole } from "../middleware/requireRole";

const router = express.Router();

router.get("/", verifyFirebaseToken, requireRole(["admin"]), getUsers);
router.get("/:id", verifyFirebaseToken, getUserById);
router.post("/", verifyFirebaseToken, requireRole(["admin"]), createUser);
router.post("/set-role", verifyFirebaseToken, requireRole(["admin"]), setUserRole);

export default router;
