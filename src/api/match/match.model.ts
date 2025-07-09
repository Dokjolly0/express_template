import mongoose from "mongoose";
import { Match } from "./match.entity";

const matchSchema = new mongoose.Schema<Match>({
  date: { type: String || Date, default: Date.now },
  player1: { type: mongoose.Types.ObjectId, ref: "User" },
  player2: { type: mongoose.Types.ObjectId, ref: "User" },
  played: { type: Boolean, default: false },
  scorePlayer1: { type: Number, default: 0 },
  scorePlayer2: { type: Number, default: 0 },
  createdBy: { type: mongoose.Types.ObjectId, ref: "User" },
  modifiedBy: { type: mongoose.Types.ObjectId, ref: "User" },
  note: { type: String, default: "" },
});

matchSchema.virtual("winner").get(function () {
    if (this.played) {
        if (this.scorePlayer1 > this.scorePlayer2) return this.player1;
        if (this.scorePlayer2 > this.scorePlayer1) return this.player2;
    }
    return null; // No winner if not played or scores are equal
});

matchSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

matchSchema.set("toObject", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const MatchModel = mongoose.model<Match>("Match", matchSchema);
