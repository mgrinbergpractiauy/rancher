// pkg/cluster-log-extension/vue.config.js
const path = require('path');
const CWD = path.resolve(__dirname, '..', '..', '..'); // Tres niveles arriba (rancher root)

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  chainWebpack(config) {
    config.resolve.alias
      // Apuntamos al directorio node_modules/ en la raíz (CWD),
      // ya que así es como Webpack a menudo lo resuelve en Rancher.
      .set('@shell', path.resolve(CWD, 'node_modules/@rancher/shell'))
      .set('~@shell', path.resolve(CWD, 'node_modules/@rancher/shell'));
  }
});
