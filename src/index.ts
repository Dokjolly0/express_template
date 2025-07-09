import "dotenv/config";
import "reflect-metadata";
import mongoose from "mongoose";

import app from "./app";
import { requireEnvVars } from "./utils/dotenv";
import { emailService } from "./utils/services/email.service";

const [MONGO_URI, DB_NAME, PORT, ADMIN_USER_NAME] = requireEnvVars([
  "MONGO_URI",
  "DB_NAME",
  "PORT",
  "ADMIN_USER_NAME",
]);

mongoose.set("debug", true);
mongoose
  .connect(`${MONGO_URI}/${DB_NAME}`)
  .then((_) => {
    PORT;
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      emailService.sendEmail("alexviolattolibero.it@gmail.com", "Test Email", "Server started successfully");
    });
  })
  .catch((err) => {
    console.error(err);
  });
