const nextJest = require('next/jest');

// Create Jest configuration with Next.js
const createJestConfig = nextJest({
    dir: './', // Root directory
});

// Custom Jest configuration
const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],  // Ensure the setup file is used
    testEnvironment: 'jest-environment-jsdom',        // Use jsdom for React component testing
    testMatch: [
        '**/__tests__/**/*.[jt]s?(x)',                // Looks for test files in __tests__ folders
        '**/?(*.)+(spec|test).[tj]s?(x)'               // Looks for *.test.js or *.spec.tsx files
    ],
    moduleDirectories: ['node_modules', '<rootDir>/src'], // Resolve imports from 'src' directory
};

module.exports = createJestConfig(customJestConfig);
