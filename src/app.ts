import express from "express";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "./api/routes";
import { errorHandlers } from "./errors";
import "./utils/auth/auth-handlers";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json()); // Prima di express 4.16 -> app.use(bodyParser.json());
app.use("/api", apiRouter);
app.use(errorHandlers);

export default app;
