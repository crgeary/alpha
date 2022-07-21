import { useExpressServer } from "@alpha/http-server";
import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import { Container } from "inversify";
import "reflect-metadata";
import { userModule } from "./modules/users";

const app = express();

app.use(helmet());
app.use(cookieParser());

app.get("/", (req, res) => res.json({ message: "Hello, World!" }));

useExpressServer(app, {
    container: new Container({ autoBindInjectable: true }),
    controllers: [...userModule.controllers],
});

export { app };
