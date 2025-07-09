import { UserModel } from "../user/user.model";
import { MatchModel } from "../match/match.model";
import { ClassificationEntry } from "./classification.entity";

export class ClassificationService {
  async getClassification(): Promise<ClassificationEntry[]> {
    const users = await UserModel.find({ isTournamentParticipant: true });
    console.log("Users found:", users.length);

    const results = await Promise.all(
      users.map(async (user) => {
        const matches = await MatchModel.find({
          played: true,
          $or: [{ player1: user._id }, { player2: user._id }],
        });

        const gamesPlayed = matches.length;
        const gamesWon = matches.filter(
          (m) =>
            (m.player1.toString() === user.id && m.scorePlayer1 > m.scorePlayer2) ||
            (m.player2.toString() === user.id && m.scorePlayer2 > m.scorePlayer1)
        ).length;

        return {
          userId: user.id!,
          firstName: user.firstName,
          lastName: user.lastName,
          gamesPlayed,
          gamesWon,
          winRate: gamesPlayed > 0 ? parseFloat((gamesWon / gamesPlayed).toFixed(3)) : 0,
        };
      })
    );

    const min5 = results.filter((r) => r.gamesPlayed >= 5).sort((a, b) => b.winRate - a.winRate);
    const under5 = results.filter((r) => r.gamesPlayed < 5);
    return [...min5, ...under5];
  }
}

export default new ClassificationService();
