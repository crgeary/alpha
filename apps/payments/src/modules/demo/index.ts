import { Module } from "../../common/types";
import { DemoController } from "./controllers/demo.controller";

const demoModule: Module = {
    controllers: [DemoController],
};

export { demoModule };
