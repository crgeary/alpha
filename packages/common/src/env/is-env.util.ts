type Env = "development" | "production" | "test";

export const isEnv = (env: Env) => {
    return process.env.NODE_ENV === env;
};
