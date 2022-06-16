declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production" | "test";
            DATABASE_URL: string;
            JWT_ACCESS_TOKEN_SECRET: string;
        }
    }
}

export {};
