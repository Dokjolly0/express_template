import "reflect-metadata";
import mongoose from "mongoose";

import app from "./app";
import { requireEnvVars } from "./utils/dotenv";

const [MONGO_URI, DB_NAME, PORT, ENVIRONMENT] = requireEnvVars([
  "MONGO_URI",
  "DB_NAME",
  "PORT",
  "ENVIRONMENT"
]);

// Attiva il debug solo in sviluppo
if (process.env.ENVIRONMENT !== "production") {
  mongoose.set("debug", true);
}
mongoose
  .connect(`${MONGO_URI}/${DB_NAME}`)
  .then((_) => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
