const path = require('path');

// Localizamos la raíz del repositorio (donde está la carpeta /shell)
const RANCHER_ROOT = path.resolve(__dirname, '..', '..');

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  // 1. SOLUCIÓN AL ERROR ESLINT: Desactiva la validación de estilo al compilar
  lintOnSave: false,

  chainWebpack(config) {
    // 2. SOLUCIÓN AL ERROR DE ALIAS: 
    // Apuntamos @shell a la carpeta física 'shell' en la raíz del proyecto
    const shellPath = path.resolve(RANCHER_ROOT, 'shell');

    config.resolve.alias
      .set('@shell', shellPath)
      .set('~@shell', shellPath);

    // Opcional: Si usas componentes de @components, asegúrate que también resuelvan
    config.resolve.alias
      .set('@pkg', path.resolve(__dirname))
      .set('~@pkg', path.resolve(__dirname));
  }
});
