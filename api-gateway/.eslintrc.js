module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'airbnb-base',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 2, // Means error
    'no-unused-vars': 'off',
    'import/extensions': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-constructor': 'off',
    'no-console': 'off'
  }
};
