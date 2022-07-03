import { HttpStatus } from "@alpha/common";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import "reflect-metadata";
import { useContainer, useExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { ErrorHandler } from "./common/middleware/error-handler.middleware";
import { userModule } from "./modules/users";

const app = express();

app.use(helmet());
app.use(cookieParser());

app.use((req, res) => res.json({ message: "Hello, World!" }));

useContainer(Container);

useExpressServer(app, {
    controllers: [...userModule.controllers],
    middlewares: [ErrorHandler],
    defaultErrorHandler: false,
    defaults: {
        undefinedResultCode: HttpStatus.NO_CONTENT,
    },
});

export { app };
