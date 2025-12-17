const path = require('path');

// Localizamos la carpeta raíz del repositorio (rancher/rancher)
const root = path.resolve(__dirname, '..', '..');
const shellPath = path.join(root, 'shell');

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  lintOnSave: false,
  chainWebpack(config) {
    // 1. Forzar alias con rutas absolutas del sistema de archivos de GitHub
    config.resolve.alias
      .set('@shell', shellPath)
      .set('~@shell', shellPath);

    // 2. IMPORTANTE: Permitir que el cargador de Vue procese la carpeta /shell
    // Sin esto, Webpack encuentra el archivo pero se niega a leerlo
    config.module
      .rule('vue')
      .include
        .add(shellPath)
        .add(__dirname)
        .end();

    // 3. Asegurar que resuelva las dependencias desde la raíz si no están en la extensión
    config.resolve.modules
      .add(path.join(root, 'node_modules'))
      .add('node_modules');
  }
});
