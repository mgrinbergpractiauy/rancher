const path = require('path');

// Localizamos la carpeta 'shell' en la raíz del repositorio
const rancherRoot = path.resolve(__dirname, '..', '..');
const shellPath = path.join(rancherRoot, 'shell');

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  lintOnSave: false,
  chainWebpack(config) {
    // Forzamos la resolución de @shell a la carpeta física del repo
    config.resolve.alias
      .set('@shell', shellPath)
      .set('~@shell', shellPath);

    // También añadimos @pkg por si el routing lo usa
    config.resolve.alias
      .set('@pkg', __dirname)
      .set('~@pkg', __dirname);
  }
});
