const path = require('path');

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  lintOnSave: false,
  chainWebpack(config) {
    // Definimos la ruta raíz del repositorio de Rancher
    // __dirname es pkg/cluster-log-extension, así que subimos 2 niveles
    const rootContext = path.resolve(__dirname, '../../');
    const shellPath = path.join(rootContext, 'shell');

    // Forzamos a Webpack a que use estas rutas para los alias
    config.resolve.alias
      .set('@shell', shellPath)
      .set('~@shell', shellPath)
      .set('@pkg', __dirname)
      .set('~@pkg', __dirname);

    // Esto ayuda a que Webpack busque en las carpetas de node_modules correctas
    config.resolve.modules
      .add(path.join(rootContext, 'node_modules'))
      .add('node_modules');
  }
});
