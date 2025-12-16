// pkg/cluster-log-extension/vue.config.js
const path = require('path');

// Definimos la ruta de la raíz del repositorio Rancher (dos niveles arriba de pkg/cluster-log-extension)
const RANCHER_ROOT = path.resolve(__dirname, '..', '..'); 

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  chainWebpack(config) {
    // Apuntamos explícitamente a la librería de la UI del shell de Rancher.
    const SHELL_LIB = path.resolve(RANCHER_ROOT, 'node_modules/@rancher/shell/lib');

    config.resolve.alias
      .set('@shell', SHELL_LIB)
      .set('~@shell', SHELL_LIB);
  }
});
