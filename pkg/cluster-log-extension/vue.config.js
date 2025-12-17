const path = require('path');

// La raíz del repositorio donde está la carpeta /shell
const RANCHER_ROOT = path.resolve(__dirname, '..', '..');

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  lintOnSave: false,
  chainWebpack(config) {
    // Apuntamos @shell a la carpeta física de código de Rancher
    const shellSource = path.resolve(RANCHER_ROOT, 'shell');

    config.resolve.alias
      .set('@shell', shellSource)
      .set('~@shell', shellSource);
  }
});
