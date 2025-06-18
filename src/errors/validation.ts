import { NextFunction, Request, Response } from "express";
import { ValidationError as OriginalValidationError } from "class-validator";

export class ValidationError extends Error {
  originalErrors: OriginalValidationError[];

  constructor(errors: OriginalValidationError[]) {
    const message = errors.map((err) => Object.values(err.constraints ?? {}).join(", ")).join("; ");

    super(message);
    this.originalErrors = errors;
    this.name = "ValidationError";
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export const validationErrorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res.status(400).json({
      error: err.name,
      message: err.message,
      details: err.originalErrors.map((e) => ({
        property: e.property,
        constraints: e.constraints,
        value: e.value
      }))
    });
  } else {
    next(err);
  }
};
