import { Request, Response, NextFunction } from "express";
import classificationService from "./classification.service";
import { TypedRequest } from "../../utils/typed-request";
import { UnauthorizedError } from "../../errors/unoutorized-error";
import { User } from "../user/user.entity";

export const getClassification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    console.log("User is authorized to view classification:", user);
    if (!user || !user.isTournamentParticipant)
      throw new UnauthorizedError("Solo gli iscritti al torneo possono vedere la classifica");

    const data = await classificationService.getClassification();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};
