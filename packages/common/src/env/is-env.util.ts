import { NodeEnv } from "./types";

export const isEnv = (env: NodeEnv) => {
    return process.env.NODE_ENV === env;
};
