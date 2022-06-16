import { Module } from "../../common/types";
import { AuthController } from "./controllers/auth.controller";
import { UserController } from "./controllers/user.controller";

const userModule: Module = {
    controllers: [UserController, AuthController],
};

export { userModule };
