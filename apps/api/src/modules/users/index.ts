import { Module } from "../../common/types";
import { UserController } from "./controllers/user.controller";

// Todo: Re-implement AuthController

const userModule: Module = {
    controllers: [UserController],
};

export { userModule };
