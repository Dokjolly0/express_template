import express from "express";
import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import matchRouter from "./match/match.router";

const router = express.Router();

router.use("/users", userRouter);
router.use("/match", matchRouter);
router.use(authRouter);

export default router;
