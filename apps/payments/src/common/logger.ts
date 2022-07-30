import { createLogger } from "@alpha/logger";

export const { logger } = createLogger({
    name: "payments",
    environment: process.env.NODE_ENV,
});
