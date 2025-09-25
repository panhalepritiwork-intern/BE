import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import cors from "cors";   
import { verifyFirebaseToken } from "./middleware/verifyFirebaseToken";

dotenv.config();

// connect to DB
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",   
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Logs
console.log("Middlewares and cors setup done");

// Routes
app.use("/api/users", userRoutes);
console.log("User routes ready");

app.use("/api/tasks", verifyFirebaseToken, taskRoutes);
console.log("Task routes ready with auth check");

app.get("/", (req: any, res: any) => {
  console.log("Root endpoint hit");
  res.json({ message: "API is working fine!!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
