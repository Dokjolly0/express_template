import { Request, Response, NextFunction } from "express";

export class UnauthorizedError extends Error {
  constructor(message = "User not authorized") {
    super(message);
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export const unauthorizedErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof UnauthorizedError) {
    res.status(401).json({
      error: err.name,
      message: err.message
    });
  } else {
    next(err);
  }
};
