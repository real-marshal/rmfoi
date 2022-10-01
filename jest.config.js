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
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/fileMock.js',
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['jest-extended/all'],
  slowTestThreshold: 5,
}
