module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "eqeqeq":'error',
    'no-trailing-spaces':'error',
    "object-curly-spacing": [
      "error", "always"
  ],
  "arrow-spacing": [
      "error", { "before": true, "after": true }
  ],
  'no-console':0,
  'linebreak-style':0,
  'semi':0,
  'arrow-parens':0
  }
};
