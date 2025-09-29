import express from "express";
import { loginWithJWT } from "../controllers/authController";

const router = express.Router();

router.post("/login", loginWithJWT);

export default router;
