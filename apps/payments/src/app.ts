import { useExpressServer } from "@alpha/http-server";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import "reflect-metadata";
import { container } from "./common/container";
import { ErrorHandlerMiddleware } from "./common/middleware/error-handler.middleware";
import { demoModule } from "./modules/demo";

const app = express();

app.use(helmet());

useExpressServer(app, {
    container,
    controllers: [...demoModule.controllers],
    errorHandlerMiddleware: ErrorHandlerMiddleware,
});

export { app };
