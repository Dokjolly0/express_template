import { MatchModel } from "./match.model";
import { Match } from "./match.entity";
import { UserModel } from "../user/user.model";
import { NotFoundError } from "../../errors/not-found";
import { UnauthorizedError } from "../../errors/unoutorized-error";
import { validateMatchScore } from "../../utils/validate-match-score";
import { BadRequestError } from "../../errors/bad-request-error";

export class MatchService {
  // Crea un nuovo match
  async create(matchData: Match, creatorId: string): Promise<Match> {
    const user = await UserModel.findById(creatorId);
    if (!user || user.role !== "admin") throw new UnauthorizedError("Solo gli organizzatori possono creare match");

    if (matchData.player1 === matchData.player2)
      throw new BadRequestError("I due giocatori devono essere diversi");

    const match = await MatchModel.create({
      ...matchData,
      createdBy: creatorId,
      modifiedBy: creatorId,
    });

    return match;
  }

  // Aggiorna un match
  async update(matchId: string, updates: Partial<Match>, userId: string): Promise<Match> {
    const user = await UserModel.findById(userId);
    if (!user || user.role !== "admin") throw new UnauthorizedError("Solo gli organizzatori possono modificare match");

    const match = await MatchModel.findById(matchId);
    if (!match) throw new NotFoundError();

    if (updates.player1 && updates.player1 === updates.player2)
      throw new BadRequestError("I due giocatori devono essere diversi");

    // Se viene registrato il risultato
    if (updates.played && updates.scorePlayer1 != null && updates.scorePlayer2 != null) {
      validateMatchScore(updates.scorePlayer1, updates.scorePlayer2);
    }

    Object.assign(match, updates, { modifiedBy: userId });
    await match.save();
    return match;
  }

  // Elimina un match
  async delete(matchId: string, userId: string): Promise<void> {
    const user = await UserModel.findById(userId);
    if (!user || user.role !== "admin") throw new UnauthorizedError("Solo gli organizzatori possono eliminare match");

    const match = await MatchModel.findById(matchId);
    if (!match) throw new NotFoundError();

    await MatchModel.findByIdAndDelete(matchId);
  }

  // Recupera tutti i match
  async getAll(userId: string): Promise<Match[]> {
    const user = await UserModel.findById(userId);
    if (!user || user.role !== "admin") throw new UnauthorizedError("Accesso riservato agli iscritti al torneo");

    return await MatchModel.find()
      .populate("player1", "firstName lastName")
      .populate("player2", "firstName lastName")
      .sort({ date: 1 });
  }

  // Recupera un match per ID
  async getById(matchId: string, userId: string): Promise<Match> {
    const user = await UserModel.findById(userId);
    if (!user || user.role !== "admin") throw new UnauthorizedError();

    const match = await MatchModel.findById(matchId)
      .populate("player1", "firstName lastName")
      .populate("player2", "firstName lastName");

    if (!match) throw new NotFoundError();
    return match;
  }

  // Recupera i match giocati da un determinato utente (per classifica, stats, ecc.)
  async getMatchesForUser(userId: string): Promise<Match[]> {
    return await MatchModel.find({
      played: true,
      $or: [{ player1: userId }, { player2: userId }],
    });
  }
}

export default new MatchService();
