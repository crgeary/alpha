declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production" | "test";
            ROLLBAR_SERVER_ACCESS_TOKEN: string;
        }
    }
}

export {};
