module.exports = {
  testEnvironment: 'jsdom',
  rootDir: './src',
  cacheDirectory: '../.cache/jest',
  setupFiles: ['./test/setupJest.js'],
  clearMocks: true,
  collectCoverageFrom: ['**/*.{ts,tsx}'],
  coverageDirectory: '../coverage',
  coverageReporters: ['text'],
  reporters: ['default', 'github-actions'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  // TODO: add asset mocks
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['jest-extended/all'],
  slowTestThreshold: 5,
  verbose: true,
}
