module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.client.setup.js'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  collectCoverageFrom: ['**/*.{js,jsx,ts,tsx}', '!<rootDir>/*', '!**/coverage/**', '!**/*.d.ts', '!**/__test__/**'],
  coverageThreshold: {
    global: {
      branches: 30,
      functions: 40,
      lines: 50,
      statements: 50,
    },
  },
}
