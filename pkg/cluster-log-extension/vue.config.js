const path = require('path');

// Buscamos la carpeta 'shell' subiendo desde pkg/cluster-log-extension hasta la raíz
const shellPath = path.resolve(__dirname, '..', '..', 'shell');

module.exports = require('../../node_modules/@rancher/shell/pkg/vue.config')(__dirname, {
  lintOnSave: false,
  chainWebpack(config) {
    // 1. Forzamos los alias para que apunten a la carpeta física real
    config.resolve.alias
      .set('@shell', shellPath)
      .set('~@shell', shellPath);

    // 2. Le decimos a Webpack que si no encuentra algo en la extensión, 
    // lo busque en los node_modules de la raíz del proyecto
    config.resolve.modules
      .add(path.resolve(__dirname, '../../node_modules'));
    
    // 3. Importante: Asegurar que Webpack pueda cargar archivos .vue de fuera de su carpeta
    config.module
      .rule('vue')
      .include
        .add(shellPath)
        .end();
  }
});
