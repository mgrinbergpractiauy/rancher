const path = require('path');

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  lintOnSave: false,
  chainWebpack(config) {
    // Definimos dónde está el core de Rancher exactamente
    const shellPath = path.resolve(__dirname, '../../shell');

    config.resolve.alias
      .set('@shell', shellPath)
      .set('~@shell', shellPath);
  }
});
