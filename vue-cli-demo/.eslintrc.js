module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arrow-parens': 'off',
    'max-len': 'off',
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'no-param-reassign': 'off',
    'operator-linebreak': 'off',
    'prefer-template': 'off',
    'no-unused-vars': 'off',
    'no-alert': 'off',
    'no-plusplus': 'off',
    'object-curly-newline': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        mocha: true,
      },
    },
  ],
};
