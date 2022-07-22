import { useExpressServer } from "@alpha/http-server";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import "reflect-metadata";
import { container } from "./common/container";
import { ErrorHandlerMiddleware } from "./common/middleware/error-handler.middleware";
import { userModule } from "./modules/users";

const app = express();

app.use(helmet());
app.use(cookieParser());

useExpressServer(app, {
    container,
    controllers: [...userModule.controllers],
    errorHandlerMiddleware: ErrorHandlerMiddleware,
});

export { app };
