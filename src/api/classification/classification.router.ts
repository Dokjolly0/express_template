import express from "express";
import { getClassification } from "./classification.controller";
import { isAuthenticated } from "../../utils/auth/authenticated-middleware";

const router = express.Router();

router.get("/", isAuthenticated, getClassification);

export default router;
