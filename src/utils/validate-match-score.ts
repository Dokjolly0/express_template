import { BadRequestError } from "../errors/bad-request-error";

export function validateMatchScore(score1: number, score2: number): void {
  if (score1 < 0 || score2 < 0) throw new BadRequestError("I punteggi devono essere >= 0");
  if (score1 === score2) throw new BadRequestError("Una partita non può finire in pareggio");

  const maxScore = Math.max(score1, score2);
  const minScore = Math.min(score1, score2);

  if (maxScore < 11) throw new BadRequestError("Il vincitore deve raggiungere almeno 11 punti");

  // Se si arriva a 10-10, serve vantaggio di 2
  if (maxScore >= 11 && maxScore <= 13 && maxScore - minScore < 2)
    throw new BadRequestError("Deve esserci almeno 2 punti di differenza se il punteggio è sopra 10");

  if (maxScore > 13 && maxScore - minScore < 2)
    throw new BadRequestError("Punteggio non valido: serve vantaggio di 2 punti");
}
