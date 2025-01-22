/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@testing-library/user-event$': '<rootDir>/node_modules/@testing-library/user-event',
  },

};