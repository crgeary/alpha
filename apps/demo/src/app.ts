import "dotenv/config";
import "reflect-metadata";

// --

import express from "express";

const app = express();

app.get("/", async (req, res) => {
    return res.json({ message: `Hello World!` });
});

export { app };
