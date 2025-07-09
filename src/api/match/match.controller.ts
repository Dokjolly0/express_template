import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request";
import matchService from "./match.service";
import { Match } from "./match.entity";

// Crea una nuova partita
export const createMatch = async (req: TypedRequest<Match>, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const matchData: Match = req.body;
    const result = await matchService.create(matchData, user.id!);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// Modifica una partita esistente
export const updateMatch = async (req: TypedRequest<Match>, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const matchId = req.params.id;
    const updates = req.body;
    const result = await matchService.update(matchId, updates, user.id!);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Elimina una partita
export const deleteMatch = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const matchId = req.params.id;
    await matchService.delete(matchId, user.id!);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Ottieni tutte le partite
export const getAllMatches = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const result = await matchService.getAll(user.id!);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Ottieni una singola partita per ID
export const getMatchById = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const user = req.user!;
    const matchId = req.params.id;
    const result = await matchService.getById(matchId, user.id!);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

// Ottieni tutte le partite giocate da un utente specifico
export const getMatchesForUser = async (req: TypedRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId;
    const result = await matchService.getMatchesForUser(userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
};
