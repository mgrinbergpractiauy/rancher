const path = require('path');

// Esta es la raíz del repositorio de Rancher
const RANCHER_ROOT = path.resolve(__dirname, '..', '..');

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  // 1. Forzamos a que ignore errores de linter para que no rompa el build
  lintOnSave: false,

  chainWebpack(config) {
    // 2. Definimos @shell apuntando a la carpeta real en el repo
    const shellPath = path.resolve(RANCHER_ROOT, 'shell');

    config.resolve.alias
      .set('@shell', shellPath)
      .set('~@shell', shellPath);

    // 3. Opcional: Si usas componentes de @pkg, asegúrate que sepa que es esta carpeta
    config.resolve.alias
      .set('@pkg', __dirname)
      .set('~@pkg', __dirname);
  }
});
