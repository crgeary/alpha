import { app } from "./app";
import { validateEnv } from "./env/validate-env.util";

const port = process.env.PORT || 4000;

validateEnv();

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Listening on port ${port}`);
});
