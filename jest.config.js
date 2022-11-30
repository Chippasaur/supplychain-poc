module.exports = {
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  moduleNameMapper: {
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',
  },
  projects: ['<rootDir>/client/jest.client.config.js', '<rootDir>/server/__test__/jest.server.config.js'],

  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/*',
    '!**/node_modules/**',
    '!**/__test__/**',
    '!**/migrations/*',
    '!**/middlewares/*',
    '!**/*.d.ts',
    '!**/coverage/**',
  ],
}
