import mongoose, { Document } from "mongoose";
import { User } from "./user.entity";
import { USER_ROLE_ENUM, USER_STATUS_ENUM } from "../../_utils/enums/user.enum";

export const userSchema = new mongoose.Schema<User>({
  firstName: { type: String },
  lastName: { type: String },
  picture: { type: String, default: "" },

  status: { type: String, enum: USER_STATUS_ENUM, default: null },
  role: { type: String, enum: USER_ROLE_ENUM, default: "user" },

  createdAt: { type: Date || String, default: null },
  lastUpdateAt: { type: Date || String, default: null },
  lastLogin: { type: Date || String, default: null },
  lastAllowedIp: { type: String, default: null },
  allowedIps: { type: [String], default: null }
});

userSchema.set("toJSON", {
  virtuals: true,
  transform: (_: Document, ret: Record<string, any>) => {
    delete ret._id;
    delete ret.__v;
    delete ret.isConfirmed;
    if (ret.role === "user") {
      delete ret.storeIds;
    }
    return ret;
  }
});

userSchema.set("toObject", {
  virtuals: true,
  transform: (_: Document, ret: Record<string, any>) => {
    delete ret._id;
    delete ret.__v;
    // delete ret.isConfirmed;
    if (ret.role === "user") {
      delete ret.storeIds;
    }
    return ret;
  }
});

export const UserModel = mongoose.model<User>("User", userSchema);
