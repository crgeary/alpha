const defaultConfig = require("tailwindcss/defaultConfig");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/components/**/*.{ts,tsx}", "./src/pages/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["InterVariable", ...defaultConfig.theme.fontFamily.sans],
            },
        },
    },
    plugins: [],
};
