/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-unused-vars': ['warn', { vars: 'all', args: 'none' }],
    'linebreak-style': ['error', 'windows'],
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'warn',
    camelcase: 'off',
    'no-console': 'warn',
    'no-alert': 'warn',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
  },
};
