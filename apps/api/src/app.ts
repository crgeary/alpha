import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { userModule } from "./modules/users";
import { ErrorHandler } from "./common/middleware/error-handler.middleware";
import { HttpStatus } from "@app/common";
import cookieParser from "cookie-parser";
import helmet from "helmet";

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
