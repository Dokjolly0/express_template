import express from "express";
import * as matchController from "./match.controller";
import { isAuthenticated } from "../../utils/auth/authenticated-middleware";
import { validate } from "../../utils/validation-middleware";
import { CreateMatchDTO, UpdateMatchDTO } from "./match.dto";

const router = express.Router();

router.use(isAuthenticated); // Tutte le rotte richiedono autenticazione
router.post("/", validate(CreateMatchDTO), matchController.createMatch);
router.put("/:id", validate(UpdateMatchDTO), matchController.updateMatch);
router.delete("/:id", matchController.deleteMatch);
router.get("/", matchController.getAllMatches);
router.get("/:id", matchController.getMatchById);
router.get("/user/:userId", matchController.getMatchesForUser);

export default router;
