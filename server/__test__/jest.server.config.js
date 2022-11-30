module.exports = {
  testEnvironment: 'node',
  rootDir: './..',
  setupFilesAfterEnv: ['<rootDir>/__test__/jest.server.setup.js'],
  globalSetup: '<rootDir>/__test__/global-setup.js',
  globalTeardown: '<rootDir>/__test__/global-teardown.js',

  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/__test__/**',
    '!<rootDir>/*',
    '!**/coverage/**',
    '!**/migrations/*',
    '!**/middlewares/*',
    '!**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 63,
      functions: 82,
      lines: 74,
      statements: 75,
    },
  },
}
