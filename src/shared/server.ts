import 'reflect-metadata';
import "dotenv/config";

import express, {NextFunction, Request, Response} from "express";
import "express-async-errors";
import routes from "./infra/routes";
import cors from "cors";

import "./infra/typeorm";
import "./container";
import {errors} from "celebrate";
import AppError from "./errors/AppError";

const APP_PORT = process.env.APP_PORT || 3333;

const app = express();

app.use(
    cors(),
    express.json(),
    routes,
    errors(),
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    console.error(err);
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(APP_PORT, () => {
    console.log(`▶️ Server started on port ${APP_PORT} !`);
});
