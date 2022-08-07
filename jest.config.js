/**
 * @file Jest configuration file.
 */

module.exports = {
  testEnvironment: 'node',
  globalSetup: './test/libs/global-setup.js',
  globalTeardown: './test/libs/global-teardown.js',
  roots: ['./test'],
};
