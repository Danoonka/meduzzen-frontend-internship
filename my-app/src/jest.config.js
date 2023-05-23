module.exports = {
    preset: 'ts-jest',
    transformIgnorePatterns: ["node_modules/(?!axios)"],
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },

    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    globals: {
        'ts-jest': {
            useESM: true,
            esModuleInterop: true,
        },
    },
};
