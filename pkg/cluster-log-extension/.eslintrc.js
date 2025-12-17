module.exports = {
  root: true,
  env: { node: true, browser: true },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: { ecmaVersion: 2020 },
  rules: {
    'no-console': 'off',
    // ESTA ES LA REGLA CLAVE: permite require() en archivos .ts
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  }
};
