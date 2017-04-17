module.exports = {
  extends: ['standard'],
  plugins: [
    "standard"
  ],
  parserOptions: {
    ecmaFeatures: {
      ecmaVersion: 6,
    }
  },
  globals: {
    'it': true,
    'describe': true,
    'before': true,
    'beforeEach': true,
    'after': true
  },
  rules: {
    'id-length': ["error", { "exceptions": ['_', 'y', 'x', 'r', 'g', 'b', 'a', 'j', 'i']}],
  },
  env: {
    browser: true,
    node: true,
    es6: true
  }
};