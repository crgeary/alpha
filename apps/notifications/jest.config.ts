export default {
    preset: "ts-jest",
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: ["src/**/*.{js,ts}"],
    coverageProvider: "v8",
    testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
    setupFiles: ["dotenv/config"],
};
