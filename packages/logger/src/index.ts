import Rollbar from "rollbar";

export * from "./utils";

export const rollbar = new Rollbar({
    accessToken: process.env.ROLLBAR_SERVER_ACCESS_TOKEN,
    environment: "development",
});
