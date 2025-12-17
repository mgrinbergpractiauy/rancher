// pkg/cluster-log-extension/vue.config.js
const path = require('path');

// Apuntamos a la raíz del repositorio de Rancher
const RANCHER_ROOT = path.resolve(__dirname, '..', '..'); 

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  chainWebpack(config) {
    // Definimos la ruta de la librería de UI del shell, donde están los archivos .vue.
    const SHELL_LIB = path.resolve(RANCHER_ROOT, 'node_modules/@rancher/shell/lib');

    config.resolve.alias
      .set('@shell', SHELL_LIB)
      .set('~@shell', SHELL_LIB);
  }
});
