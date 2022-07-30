import { createLogger } from "@alpha/logger";

export const { logger } = createLogger({
    name: "accounts",
    environment: process.env.NODE_ENV,
});
