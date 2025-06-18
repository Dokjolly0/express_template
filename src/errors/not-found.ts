import { Request, Response, NextFunction } from "express";

export class NotFoundError extends Error {
  constructor(entity?: string) {
    super(`Entity ${entity} not found`);
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export const notFoundErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof NotFoundError) {
    res.status(404).json({
      error: err.name,
      message: err.message
    });
  } else {
    next(err);
  }
};
