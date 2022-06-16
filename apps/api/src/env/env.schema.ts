import { NodeEnv } from "@app/common";
import { IsIn, IsString, MinLength } from "class-validator";

export class EnvSchema {
    @IsIn(["development", "production", "test"])
    NODE_ENV!: NodeEnv;

    @IsString()
    DATABASE_URL!: string;

    @IsString()
    @MinLength(32)
    JWT_ACCESS_TOKEN_SECRET!: string;
}
