module.exports = {
  root: true,
  env: { node: true, browser: true },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  rules: {
    // ESTO EVITA QUE EL BUILD SE DETENGA POR TU CÓDIGO
    'no-unused-vars': 'warn', 
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-var-requires': 'off',
    'no-console': 'off'
  }
};
