import "reflect-metadata";
import express from "express";
import { useExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { userModule } from "./modules/users";

const app = express();

useContainer(Container);

useExpressServer(app, {
    controllers: [...userModule.controllers],
});

export { app };
