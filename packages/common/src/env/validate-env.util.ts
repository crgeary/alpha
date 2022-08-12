import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate } from "class-validator";

export const validateEnv = async <T extends object>(schema: ClassConstructor<T>) => {
    const errors = await validate(plainToInstance(schema, process.env));
    if (!errors.length) {
        return;
    }

    const output = errors.map((err) => {
        return `${err.property}\n${Object.values(err.constraints || {})
            .map((c) => ` - ${c}`)
            .join("\n")}`;
    });

    throw new Error(`The following ENV variables failed validation:\n\n${output.join("\n")}\n`);
};
