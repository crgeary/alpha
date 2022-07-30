export default {
    preset: "ts-jest",
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: "coverage",
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
    coverageProvider: "v8",
    testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
};
