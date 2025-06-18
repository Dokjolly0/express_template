import { customErrorHandler } from "./custom";
import { dotenvErrorHandler } from "./dotenv";
import { internalServerErrorHandler } from "./internal-server-error";
import { notFoundErrorHandler } from "./not-found";
import { unauthorizedErrorHandler } from "./unauthorized";
import { userExistErrorHandler } from "./user-exist";
import { validationErrorHandler } from "./validation";

/* Gli errori vanno messi in ordine di importanza dal piu restrittivo al piu generico */

export const errorHandlers = [
  customErrorHandler,
  validationErrorHandler,
  notFoundErrorHandler,
  dotenvErrorHandler,
  unauthorizedErrorHandler,
  userExistErrorHandler,

  // Internal server error
  internalServerErrorHandler
];
