import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  role: "user" | "admin"; 
  firebaseUid: string; 
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user"        
  },
  firebaseUid: { type: String, required: true, unique: true } 
});

export default mongoose.model<IUser>("User", userSchema);
