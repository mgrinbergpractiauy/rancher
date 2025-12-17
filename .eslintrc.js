module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  // Usamos la configuración de tipos para que entienda el ":" en los .ts
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    // Desactivamos reglas molestas para que el build pase sí o sí
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/no-unused-components': 'off'
  }
};
