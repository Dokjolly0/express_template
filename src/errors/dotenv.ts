import { Request, Response, NextFunction } from "express";

export class DotEnvError extends Error {
  constructor(entity?: string) {
    super(`Entity ${entity} not found in dotenv`);
    this.name = "DotEnvError";
    Object.setPrototypeOf(this, DotEnvError.prototype);
  }
}

export const dotenvErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof DotEnvError) {
    res.status(404).json({
      error: err.name,
      message: err.message
    });
  } else {
    next(err);
  }
};
