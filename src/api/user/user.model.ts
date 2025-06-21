import mongoose, { Document } from "mongoose";
import { User } from "./user.entity";
import { USER_ROLE_ENUM, USER_STATUS_ENUM } from "../../utils/consts/enums/user.enum";

export const userSchema = new mongoose.Schema<User>({
  firstName: { type: String },
  lastName: { type: String },
  picture: { type: String, default: "" },

  status: { type: String, enum: USER_STATUS_ENUM, default: undefined },
  role: { type: String, enum: USER_ROLE_ENUM, default: "user" },

  createdAt: { type: Date || String, default: undefined },
  lastUpdateAt: { type: Date || String, default: undefined },
  lastLogin: { type: Date || String, default: undefined },
  lastAllowedIp: { type: String, default: undefined },
  allowedIps: { type: [String], default: undefined }
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: (_: Document, ret: Record<string, any>) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

userSchema.set("toObject", {
  virtuals: true,
  transform: (_: Document, ret: Record<string, any>) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

export const UserModel = mongoose.model<User>("User", userSchema);
