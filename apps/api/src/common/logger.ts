import { createLogger } from "@alpha/logger";

export const { logger } = createLogger({
    name: "api",
    environment: process.env.NODE_ENV,
});
