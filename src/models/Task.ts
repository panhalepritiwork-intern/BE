import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  status: "pending" | "in-progress" | "completed";
  user: string; // ✅ Firebase UID string
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  user: { type: String, required: true }, // ✅ Firebase UID store होईल
});

export default mongoose.model<ITask>("Task", taskSchema);
