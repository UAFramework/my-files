module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: {
    html: "<html lang='en'><div id='root'></div></html>",
  },
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
    '\\.css$': 'jest-css-modules-transform',
  },
}

/**
 * more about jest configuration:
 * https://jestjs.io/docs/code-transformation
 * and about writing tests:
 * https://jestjs.io/docs/getting-started
 */
