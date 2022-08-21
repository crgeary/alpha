import { validateEnv } from "@alpha/common";
import { app } from "./app";
import { EnvSchema } from "./env/env.schema";

async function bootstrap() {
    const port = process.env.PORT || 4000;

    await validateEnv(EnvSchema);

    const server = app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`🚀 Listening at http://localhost:${port}`);
    });

    const shutdown = () => {
        server.close();
    };

    process.once("SIGINT", shutdown);
    process.once("SIGTERM", shutdown);
}

bootstrap();
