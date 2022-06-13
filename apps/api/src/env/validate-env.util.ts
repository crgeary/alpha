import chalk from "chalk";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { EnvSchema } from "./env.schema";

export const validateEnv = async () => {
    const errors = await validate(plainToInstance(EnvSchema, process.env));
    if (!errors.length) {
        return;
    }

    const output = errors.map((err) => {
        return `${chalk.blue.bold(err.property)}\n${Object.values(err.constraints || {})
            .map((c) => ` - ${c}`)
            .join("\n")}`;
    });

    throw new Error(`The following ENV variables failed validation:\n\n${output.join("\n")}\n`);
};
