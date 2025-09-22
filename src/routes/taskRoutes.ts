import express from "express";
import { 
  getTasks, 
  getTaskById, 
  createTask, 
  updateTask, 
  deleteTask 
} from "../controllers/taskController";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken";

const router = express.Router();

//Firebase Auth
router.use(verifyFirebaseToken);

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
