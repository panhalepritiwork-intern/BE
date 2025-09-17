import mongoose, { Document, Schema } from "mongoose";

export interface ITask extends Document {
  title: string;
  status: "pending" | "in-progress" | "completed";
  user: mongoose.Types.ObjectId;
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["pending", "in-progress", "completed"], 
    default: "pending" 
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model<ITask>("Task", taskSchema);
