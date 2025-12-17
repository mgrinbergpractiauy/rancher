module.exports = {
  root: true,
  env: { node: true, browser: true },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    // Permitimos los require que usas en tu lógica
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': 'off',
    'no-debugger': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
};
