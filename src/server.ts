import 'reflect-metadata';
import "dotenv/config";

import express from "express";
import "express-async-errors";
import routes from "./shared/infra/routes";
import errorHandler from "./shared/errors/handler";
import cors from "cors";

import "./shared/infra/typeorm";
import "./shared/container";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(app.listen(process.env.PORT || 3333));
