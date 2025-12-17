const path = require('path');

// Localizamos la raíz del repositorio de forma absoluta
const rootContext = path.resolve(__dirname, '../../');
const shellPath = path.join(rootContext, 'shell');

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  lintOnSave: false,
  chainWebpack(config) {
    // 1. Forzamos la resolución de alias a rutas absolutas del servidor
    config.resolve.alias
      .set('@shell', shellPath)
      .set('~@shell', shellPath)
      .set('@pkg', __dirname)
      .set('~@pkg', __dirname);

    // 2. IMPORTANTE: El compilador de Vue y Babel ignoran archivos fuera de la carpeta actual
    // por defecto. Aquí obligamos a que procese la carpeta 'shell'.
    config.module
      .rule('vue')
      .include
        .add(shellPath)
        .add(__dirname)
        .end();

    // 3. También incluimos la carpeta shell en la regla de JS/TS para que Babel la procese
    config.module
      .rule('js')
      .include
        .add(shellPath)
        .end();

    // 4. Aseguramos que los node_modules se busquen también en la raíz
    config.resolve.modules
      .add(path.join(rootContext, 'node_modules'))
      .add('node_modules');
  }
});
