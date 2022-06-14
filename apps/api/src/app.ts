import "reflect-metadata";
import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { userModule } from "./modules/users";
import { ErrorHandler } from "./common/middleware/error-handler.middleware";
import { HttpStatus } from "@app/common";

const app = express();

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
