const path = require('path');

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  lintOnSave: false, // Ignora errores de linter durante el build
  chainWebpack(config) {
    // Calculamos la ruta real a la carpeta /shell que está 2 niveles arriba
    const shellPath = path.resolve(__dirname, '../../shell');

    config.resolve.alias
      .set('@shell', shellPath)
      .set('~@shell', shellPath);
  }
});
