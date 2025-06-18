import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  statusCode: number;
  constructor(
    name: string = "CustomError",
    message: string = "Custom error message",
    statusCode: number = 400
  ) {
    if (!Number.isInteger(statusCode) || statusCode < 100 || statusCode > 599) {
      throw new RangeError(
        `Invalid HTTP status code: ${statusCode}. It must be an integer between 100 and 599.`
      );
    }

    super(message);
    this.name = name;
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export const customErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      error: err.name,
      message: err.message
    });
  } else {
    next(err);
  }
};
