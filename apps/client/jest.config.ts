const jestConfig = {
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    moduleNameMapper: {
        // ...
    },
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(t|j)sx?$": [
            "@swc/jest",
            {
                jsc: {
                    transform: {
                        react: {
                            runtime: "automatic",
                        },
                    },
                },
            },
        ],
    },
};

export default jestConfig;
