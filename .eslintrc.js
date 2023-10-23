module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-essential',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'no-unused-vars': ['warn', { vars: 'all', args: 'none' }],
    'max-len': 'off',
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    camelcase: 'off',
    'no-alert': 'warn',
    'no-restricted-syntax': 'off',
    'no-underscore-dangle': 'off',
  },
};
