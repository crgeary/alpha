import { app } from "./app";

const port = process.env.PORT || 4000;

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Listening on port ${port}`);
});
