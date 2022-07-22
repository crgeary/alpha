import { Module } from "../../common/types";
import { UserController } from "./controllers/user.controller";

const userModule: Module = {
    controllers: [UserController],
};

export { userModule };
