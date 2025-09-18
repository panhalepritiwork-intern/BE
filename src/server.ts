import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";
import cors from "cors";   // ✅ Import cors

dotenv.config();
connectDB();

const app = express();

// ✅ Use cors before routes
app.use(cors({
  origin: "http://localhost:5173",   // फक्त तुझा frontend allow करायचा असेल तर
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

//routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
