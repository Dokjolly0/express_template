import express from "express";
import * as matchController from "./match.controller";
import { isAuthenticated } from "../../utils/auth/authenticated-middleware";

const router = express.Router();

router.use(isAuthenticated); // Tutte le rotte richiedono autenticazione
router.post("/", matchController.createMatch);
router.put("/:id", matchController.updateMatch);
router.delete("/:id", matchController.deleteMatch);
router.get("/", matchController.getAllMatches);
router.get("/:id", matchController.getMatchById);
router.get("/user/:userId", matchController.getMatchesForUser);

export default router;
