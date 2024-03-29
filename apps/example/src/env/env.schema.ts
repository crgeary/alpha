import { NodeEnv } from "@alpha/common";
import { IsIn } from "class-validator";

export class EnvSchema {
    @IsIn(["development", "production", "test"])
    NODE_ENV!: NodeEnv;
}
