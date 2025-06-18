import { Request, Response, NextFunction } from "express";

export class UserExistsError extends Error {
  constructor(username: string) {
    super(`username ${username} already in use`);
    this.name = "UserExists";
    Object.setPrototypeOf(this, UserExistsError.prototype);
  }
}

export const userExistErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UserExistsError) {
    res.status(409).json({
      error: err.name,
      message: err.message
    });
  } else {
    next(err);
  }
};
