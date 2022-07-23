import { NodeEnv } from "@alpha/common";
import { IsIn, IsString } from "class-validator";

export class EnvSchema {
    @IsIn(["development", "production", "test"])
    NODE_ENV!: NodeEnv;

    @IsString()
    DATABASE_URL!: string;
}
