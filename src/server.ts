import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import authRoutes from "./routes/authRoutes"; 
import cors from "cors";   
import { verifyFirebaseToken } from "./middleware/verifyFirebaseToken";

dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); 
app.use("/api/users", userRoutes);
app.use("/api/tasks", verifyFirebaseToken, taskRoutes);

app.get("/", (req, res) => {
  res.json({ msg: "API ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server run " + PORT));
