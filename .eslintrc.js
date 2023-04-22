module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "import/prefer-default-export": "off",
    "object-curly-newline": "off",
    "linebreak-style": "off",
    "import/no-cycle": "off",
    "arrow-body-style": "off",
    "@typescript-eslint/no-useless-constructor": "off",
    "@typescript-eslint/indent": [
      "off"
    ],
    "class-methods-use-this": [
      "off"
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        "allowExpressions": false,
        "allowDirectConstAssertionInArrowFunctions": true,
        "allowConciseArrowFunctionExpressionsStartingWithVoid": true
      }
    ],
    "@typescript-eslint/return-await": [
      "off",
    ],
    "max-classes-per-file": "off",
    "operator-linebreak": "off",
    "implicit-arrow-linebreak": "off",
    "newline-per-chained-call": "off",
    "new-cap": "off",
  },
};
