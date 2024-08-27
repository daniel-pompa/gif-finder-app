module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform JS and JSX files with babel-jest
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Use identity-obj-proxy to handle CSS imports
  },
  transformIgnorePatterns: ['/node_modules/'],
};
