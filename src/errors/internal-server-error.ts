import { Request, Response, NextFunction } from "express";

export const internalServerErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).json({
    error: "InternalServerError",
    message: "The server encountered an internal error. Err: " + err.message
  });
};
